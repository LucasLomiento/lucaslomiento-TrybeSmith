import { Request, Response } from 'express';
import productsService from '../services/products.service';

async function register(req: Request, res: Response) {
  const { name, price, orderId } = req.body;
  const product = await productsService.register({ name, price, orderId });
  res.status(201).json(product.data);
}

async function getAll(_req: Request, res: Response) {
  const allProducts = await productsService.getAll();

  res.status(200).json(allProducts.data);
}

export default {
  register,
  getAll,
};
