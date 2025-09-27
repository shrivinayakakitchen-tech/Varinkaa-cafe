import React, { useState, useRef, useMemo } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { SearchBar } from './components/SearchBar';
import { Filters } from './components/Filters';
import { Menu } from './components/Menu';
import { Footer } from './components/Footer';
import { menuData, filterCategories } from './constants';
import type { MenuCategory, MenuItem, SelectedItem } from './types';
import { Cart } from './components/Cart';

const App: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItems, setSelectedItems] = useState<Map<string, SelectedItem>>(new Map());
  const [suggestionText, setSuggestionText] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    menuRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
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
      return `${whatsAppBaseUrl}${encodeURIComponent('Hello Shri Vinayaka Kitchen, I would like to place an order.')}`;
    }

    let message = "Hello Shri Vinayaka Kitchen, I would like to order:\n";
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
    const lowercasedQuery = searchQuery.toLowerCase().trim();

    const menuAfterCategoryFilter = activeFilter === 'all'
      ? menuData
      : menuData.filter(category => category.id === activeFilter);

    if (!lowercasedQuery) {
      return menuAfterCategoryFilter;
    }

    return menuAfterCategoryFilter.map(category => ({
      ...category,
      items: category.items.filter(item => 
        item.name.toLowerCase().includes(lowercasedQuery)
      ),
    })).filter(category => category.items.length > 0);

  }, [activeFilter, searchQuery]);
  
  const handleSuggestionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSuggestionText(event.target.value);
  };

  const suggestionWhatsAppUrl = `https://wa.me/919434320315?text=${encodeURIComponent(`Hello Shri Vinayaka Kitchen, I have a menu suggestion:\n\n"${suggestionText}"`)}`;


  return (
    <>
      <div className="max-w-[1180px] mx-auto my-[30px] p-7 pb-24">
        <Header 
          itemCount={totalItems}
          onCartClick={handleCartToggle}
        />
        <main>
          <Hero />
          <SearchBar 
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
          />
          <Filters 
            categories={filterCategories}
            activeFilter={activeFilter}
            onFilterChange={handleFilterChange}
          />
          <div className="mt-5">
            <div ref={menuRef} id="menu" className="min-h-[360px]">
               {filteredMenu.length > 0 ? (
                <Menu 
                  menuData={filteredMenu}
                  selectedItems={selectedItems}
                  onUpdateItem={handleUpdateItemQuantity}
                />
              ) : (
                <div className="text-center py-10 px-4 text-slate-500 bg-white/50 rounded-xl shadow-sm">
                  <svg className="mx-auto h-12 w-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <h3 className="mt-2 text-lg font-semibold text-slate-800">No dishes found</h3>
                  <p className="mt-1 text-sm text-slate-600">
                    Try adjusting your search or filter to find what you're looking for.
                  </p>
                </div>
              )}
            </div>
          </div>
        </main>
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-black/5 pt-8">
            <div className="bg-white p-5 rounded-xl shadow-lg">
                <div className="text-blue-800 font-extrabold mb-2.5">Contact</div>
                <div className="mb-3">
                  <a href="tel:+919434320315" className="block text-gray-700 font-extrabold no-underline mb-2 hover:text-blue-700">Call: +91 94343 20315</a>
                  <a href="https://www.instagram.com/shrivinayak25" target="_blank" rel="noopener noreferrer" className="block text-gray-700 font-extrabold no-underline hover:text-blue-700">Instagram: @shrivinayak25</a>
                </div>
                <div className="mt-3 text-center text-sm text-slate-700 bg-sky-100 p-3 rounded-lg border border-sky-200">
                  Also available on <span className="font-bold">Zomato</span> & <span className="font-bold">Swiggy</span>
                </div>
            </div>
             <div className="bg-white p-5 rounded-xl shadow-lg">
                <div className="text-blue-800 font-extrabold mb-2.5">Disclaimer</div>
                <div className="text-sm text-gray-600 space-y-1">
                   <p>Delivery Charges as per location.</p>
                   <p>Payment should be paid in advance.</p>
                   <p>Free delivery available above 999/-</p>
                </div>
            </div>
             <div className="bg-white p-5 rounded-xl shadow-lg">
                <div className="text-blue-800 font-extrabold mb-2.5">Have a suggestion?</div>
                <p className="text-sm text-gray-600 mb-3">Want something that's not on the menu? Let us know!</p>
                <textarea
                  value={suggestionText}
                  onChange={handleSuggestionChange}
                  placeholder="e.g., 'You should add Chole Bhature!'"
                  className="w-full p-2 rounded-md border-0 bg-sky-50 focus:ring-2 focus:ring-blue-500 transition-shadow text-sm placeholder-slate-500"
                  rows={2}
                  aria-label="Suggestion Box"
                ></textarea>
                <a
                  href={suggestionText.trim() ? suggestionWhatsAppUrl : undefined}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-3 w-full inline-block text-center px-4 py-2 rounded-lg no-underline font-bold transition-colors ${
                    suggestionText.trim()
                      ? 'bg-blue-600 hover:bg-blue-700 text-white shadow'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
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
      />
    </>
  );
};

export default App;
