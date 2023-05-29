import { Request, Response } from 'express';
import ordersService from '../services/orders.service';

async function getAll(_req: Request, res: Response) {
  const allOrders = await ordersService.getAll();
  res.status(200).json(allOrders.data);
}

export default {
  getAll,
};
