export interface Sale {
  id: number;
  quantity: number;
  sale_date: string;
  product: {
    name: string;
  };
}