import React, { useState, useRef, useMemo, useEffect } from 'react';
import { GoogleGenAI, Type } from '@google/genai';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { SearchBar } from './components/SearchBar';
import { Filters } from './components/Filters';
import { Menu } from './components/Menu';
import { AiSearchResults } from './components/AiSearchResults';
import { Footer } from './components/Footer';
import { menuData, filterCategories } from './constants';
import type { MenuCategory, MenuItem, SelectedItem, AiRecommendation } from './types';
import { Cart } from './components/Cart';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const App: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItems, setSelectedItems] = useState<Map<string, SelectedItem>>(new Map());
  const [suggestionText, setSuggestionText] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const [isAiSearching, setIsAiSearching] = useState(false);
  const [aiSearchResults, setAiSearchResults] = useState<AiRecommendation[] | null>(null);
  const debounceTimerRef = useRef<number | null>(null);

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    setSearchQuery('');
    setAiSearchResults(null);
    menuRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    
    if (!searchQuery.trim()) {
      setIsAiSearching(false);
      setAiSearchResults(null);
      return;
    }

    debounceTimerRef.current = window.setTimeout(() => {
      performAiSearch(searchQuery);
    }, 500); // 500ms debounce

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [searchQuery]);
  
  const performAiSearch = async (query: string) => {
    setIsAiSearching(true);
    setAiSearchResults(null);
    
    try {
      const responseSchema = {
        type: Type.OBJECT,
        properties: {
          recommendations: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING, description: 'The unique ID of the menu item.' },
                reason: { type: Type.STRING, description: 'A brief reason for the recommendation.' },
              },
              required: ['id', 'reason'],
            },
          },
        },
        required: ['recommendations'],
      };

      const prompt = `You are a friendly and helpful culinary AI assistant for Varnikaa Cafe, a 100% vegetarian eatery specializing in fresh, homely meals.

      A customer is asking for recommendations with the following request: "${query}"

      The user might ask for a specific dish, a category, or describe a craving. For example:
      - "masala dosa"
      - "a quick and light lunch"
      - "something cheesy and crispy"
      - "a spicy curry"
      - "mild breakfast options"
      - "something healthy"

      Please analyze the user's request and recommend the most suitable dishes from the full menu provided below. Use your knowledge of Indian cuisine to infer characteristics like spice level, meal type (snack, lunch, etc.), and potential dietary suitability (e.g., vegan, gluten-free, though all are vegetarian).

      Full Menu (JSON):
      ${JSON.stringify(menuData)}

      For each recommendation, provide a concise and helpful "reason" explaining why it's a great match for the user's request. Your response MUST be a JSON object. If no items are a good match, return an empty recommendations array.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: responseSchema,
        },
      });

      const resultJson = JSON.parse(response.text);
      setAiSearchResults(resultJson.recommendations || []);

    } catch (error) {
      console.error("AI search failed:", error);
      setAiSearchResults([]); // Set to empty on error to show 'not found' message
    } finally {
      setIsAiSearching(false);
    }
  };

  const handleCartToggle = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleUpdateItemQuantity = (item: MenuItem, change: number) => {
    setSelectedItems(prev => {
      const newItems = new Map(prev);
      const existingItem = newItems.get(item.id);
      const currentQuantity = existingItem?.quantity || 0;
      const newQuantity = currentQuantity + change;

      if (newQuantity <= 0) {
        newItems.delete(item.id);
      } else {
        newItems.set(item.id, { item, quantity: newQuantity });
      }
      return newItems;
    });
  };

  const whatsAppUrl = useMemo(() => {
    const whatsAppBaseUrl = "https://wa.me/919434320315?text=";
    if (selectedItems.size === 0) {
      return `${whatsAppBaseUrl}${encodeURIComponent('Hello Varnikaa cafe, I would like to place an order.')}`;
    }

    let message = "Hello Varnikaa cafe, I would like to order:\n";
    let totalPrice = 0;
    
    selectedItems.forEach(({ item, quantity }) => {
      message += `\n- ${item.name} x ${quantity}`;
      const price = parseInt(item.price.replace('/-', ''), 10);
      totalPrice += price * quantity;
    });

    message += `\n\n*Total: ${totalPrice}/-*`;

    return `${whatsAppBaseUrl}${encodeURIComponent(message)}`;
  }, [selectedItems]);

  const totalItems = useMemo(() => {
    return Array.from(selectedItems.values()).reduce((total, { quantity }) => total + quantity, 0);
  }, [selectedItems]);

  const filteredMenu: MenuCategory[] = useMemo(() => {
    // This hook is now only for the category filter view.
    // The main render logic decides whether to show this or AI results.
    if (aiSearchResults) {
      // If AI search is active (i.e., not null), we let the main render logic
      // decide what to do. We return [] here so that if the AI search has no
      // results, the "no results" fallback is triggered correctly.
      return [];
    }
    
    return activeFilter === 'all'
      ? menuData
      : menuData.filter(category => category.id === activeFilter);

  }, [activeFilter, aiSearchResults]);
  
  const handleSuggestionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSuggestionText(event.target.value);
  };
  
  const handleBrowseMenu = () => {
    handleCartToggle();
    // Allow the cart to animate out before scrolling
    setTimeout(() => {
        menuRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 300);
  };

  const suggestionWhatsAppUrl = `https://wa.me/919434320315?text=${encodeURIComponent(`Hello Varnikaa cafe, I have a menu suggestion:\n\n"${suggestionText}"`)}`;


  return (
    <>
      <div className="max-w-4xl mx-auto my-8 p-4 md:p-6 lg:p-8">
        <Header 
          itemCount={totalItems}
          onCartClick={handleCartToggle}
        />
        <main>
          <Hero />
          <SearchBar 
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            isLoading={isAiSearching}
          />
          <Filters 
            categories={filterCategories}
            activeFilter={aiSearchResults ? 'search' : activeFilter}
            onFilterChange={handleFilterChange}
          />
          <div className="mt-8">
            <div ref={menuRef} id="menu" className="min-h-[360px]">
              {aiSearchResults && aiSearchResults.length > 0 ? (
                <AiSearchResults
                  recommendations={aiSearchResults}
                  menuData={menuData}
                  selectedItems={selectedItems}
                  onUpdateItem={handleUpdateItemQuantity}
                />
              ) : filteredMenu.length > 0 ? (
                <Menu 
                  menuData={filteredMenu}
                  selectedItems={selectedItems}
                  onUpdateItem={handleUpdateItemQuantity}
                />
              ) : (
                // This view now handles both "no AI results" and "no category results"
                <div className="text-center py-12 px-6 bg-white rounded-2xl shadow-sm border border-[var(--border-color)]">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <h3 className="mt-4 text-lg font-semibold text-[var(--text-primary)]">
                    {aiSearchResults && aiSearchResults.length === 0 ? 'No matches found' : 'No dishes found'}
                  </h3>
                  <p className="mt-1 text-sm text-[var(--text-secondary)]">
                    {aiSearchResults && aiSearchResults.length === 0 
                      ? "The AI couldn't find a match. Try rephrasing your search."
                      : "Try adjusting your search or filter to find what you're looking for."
                    }
                  </p>
                </div>
              )}
            </div>
          </div>
        </main>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-[var(--border-color)] pt-10">
            <div className="bg-white p-6 rounded-2xl shadow-[0_4px_24px_var(--shadow-color)] border border-[var(--border-color)]">
                <div className="text-[var(--brand-primary)] text-lg font-bold mb-3">Contact</div>
                <div className="space-y-2">
                  <a href="tel:+919434320315" className="block text-[var(--text-secondary)] font-semibold no-underline hover:text-[var(--accent-primary)] transition-colors">Call: +91 94343 20315</a>
                  <a href="https://www.instagram.com/varnikaacafe" target="_blank" rel="noopener noreferrer" className="block text-[var(--text-secondary)] font-semibold no-underline hover:text-[var(--accent-primary)] transition-colors">Instagram: @varnikaacafe</a>
                </div>
                <div className="mt-4 text-center text-sm text-[var(--brand-primary)] bg-[var(--brand-primary)]/10 p-3 rounded-lg">
                  Also available on <span className="font-bold">Zomato</span> & <span className="font-bold">Swiggy</span>
                </div>
            </div>
             <div className="bg-white p-6 rounded-2xl shadow-[0_4px_24px_var(--shadow-color)] border border-[var(--border-color)]">
                <div className="text-[var(--brand-primary)] text-lg font-bold mb-3">Order & Delivery Terms</div>
                <ul className="text-sm text-[var(--text-secondary)] space-y-2 list-disc list-inside">
                   <li>All orders are confirmed only after advance payment is received.</li>
                   <li>Delivery charges vary by location. We offer free delivery for orders above 999/-</li>
                   <li>Delivery times are estimates and may vary due to unforeseen circumstances.</li>
                   <li>Please verify your order details before confirming, as modifications may not be possible later.</li>
                </ul>
            </div>
             <div className="bg-white p-6 rounded-2xl shadow-[0_4px_24px_var(--shadow-color)] border border-[var(--border-color)]">
                <div className="text-[var(--brand-primary)] text-lg font-bold mb-3">Have a suggestion?</div>
                <p className="text-sm text-[var(--text-secondary)] mb-4">Want something that's not on the menu? Let us know!</p>
                <textarea
                  value={suggestionText}
                  onChange={handleSuggestionChange}
                  placeholder="e.g., 'You should add Chole Bhature!'"
                  className="w-full p-2.5 rounded-md border border-[var(--border-color)] bg-gray-50 focus:ring-2 focus:ring-[var(--accent-primary)] transition-all text-sm placeholder-gray-500"
                  rows={2}
                  aria-label="Suggestion Box"
                ></textarea>
                <a
                  href={suggestionText.trim() ? suggestionWhatsAppUrl : undefined}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-3 w-full inline-block text-center px-4 py-2 rounded-lg no-underline font-bold transition-all duration-200 ${
                    suggestionText.trim()
                      ? 'bg-[var(--accent-primary)] hover:bg-blue-600 text-white shadow-md'
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  }`}
                  aria-disabled={!suggestionText.trim()}
                  onClick={(e) => { if (!suggestionText.trim()) e.preventDefault(); }}
                >
                  Send Suggestion
                </a>
            </div>
        </div>

        <Footer />
      </div>
      <Cart 
        isOpen={isCartOpen}
        onClose={handleCartToggle}
        selectedItems={selectedItems}
        onUpdateItem={handleUpdateItemQuantity}
        whatsAppUrl={whatsAppUrl}
        onBrowseMenu={handleBrowseMenu}
      />
    </>
  );
};

export default App;