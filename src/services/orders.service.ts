import OrdersModel from '../database/models/order.model';
import { Order, OrderWithProduct } from '../types/Order';
import { ServiceResponse } from '../types/ServiceResponse';

async function getAll(): Promise<ServiceResponse<Order[]>> {
  const getAllOrders = await OrdersModel.findAll({
    include: [{
      association: 'productIds',
      attributes: ['id'],
    }],
  });

  const dataOrders = getAllOrders.map((order) => order.dataValues) as OrderWithProduct[];

  const orders = dataOrders.map((order) => ({
    id: order.id,
    userId: order.userId,
    productIds: order.productIds.map((product: { id: number }) => product.id),
  }));

  const responseService: ServiceResponse<Order[]> = { status: 'SUCCESSFUL', data: orders };

  return responseService;
}

export default {
  getAll,
};