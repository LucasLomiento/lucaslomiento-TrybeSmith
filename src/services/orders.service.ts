import OrdersModel from '../database/models/order.model';
import { Order, OrderWithProduct } from '../types/Order';

async function getAll(): Promise<Order[]> {
  const allOrders = await OrdersModel.findAll({
    include: [{
      association: 'productIds',
      attributes: ['id'],
    }],
  });

  const dataOrders = allOrders.map((order) => order.dataValues) as OrderWithProduct[];

  const orders = dataOrders.map((order) => ({
    id: order.id,
    userId: order.userId,
    productIds: order.productIds.map((product: { id: number }) => product.id),
  }));

  return orders;
}

export default {
  getAll,
};