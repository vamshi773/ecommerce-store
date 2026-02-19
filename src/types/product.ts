export type Product = {
    id: number;
    title: string;
    price: number;
    image: string;
    category: string;
    description: string;
    rating?: { rate: number; count: number };
  };
  