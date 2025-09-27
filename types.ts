export interface MenuItem {
  id: string;
  name: string;
  price: string;
  description?: string;
}

export interface MenuCategory {
  id: string;
  title: string;
  items: MenuItem[];
}

export interface FilterCategory {
  id: string;
  name: string;
}

export type SelectedItem = {
  item: MenuItem;
  quantity: number;
};