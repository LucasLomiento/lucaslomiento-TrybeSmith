import { Product, ProductId } from './Product';

export type Order = {
  id: number;
  userId: number;
  productIds?: Array< number | Product>;
};

export type OrderWithProduct = {
  id: number;
  userId: number;
  productIds: ProductId[];
};