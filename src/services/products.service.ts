import ProductModel, { ProductInputtableTypes, 
  ProductSequelizeModel } from '../database/models/product.model';

import { ServiceResponse } from '../types/ServiceResponse';

async function register(product: ProductInputtableTypes): 
Promise<ServiceResponse<ProductSequelizeModel>> {
  const newProduct = await ProductModel.create(product);
  return { status: 'SUCCESSFUL', data: newProduct };
}

async function getAll(): Promise<ServiceResponse<ProductSequelizeModel[]>> {
  const allProducts = await ProductModel.findAll();

  return { status: 'SUCCESSFUL', data: allProducts };
}

export default {
  register,
  getAll,
};