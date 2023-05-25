import express from 'express';
import productsController from '../controllers/products.controller';

const productsRoute = express.Router();

productsRoute.post('/', productsController.register);

export default productsRoute;