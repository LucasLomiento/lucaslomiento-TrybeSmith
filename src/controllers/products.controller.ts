import { Request, Response } from 'express';
import productsService from '../services/products.service';

async function register(req: Request, res: Response) {
  const { name, price, orderId } = req.body;
  const product = await productsService.register({ name, price, orderId });
  res.status(201).json(product);
}

export default {
  register,
};
