export type DishBase = {
  id: string;
  name: string;
  price: string;
  category: string;
  description: string;
};

export type Dish = DishBase & {
  available: boolean;
};

export type Dishes = Dish[];

export type Order = DishBase & {
  quantity: string;
  total: string;
};

export type OrderSent = {
  id: string;
  time: number;
  completed: boolean;
  total: number;
  order: Order[];
  createdAt: number;
};
