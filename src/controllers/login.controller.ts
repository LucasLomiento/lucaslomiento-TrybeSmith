import { Request, Response } from 'express';
import loginService from '../services/login.service';
import mapStatusHTTP from '../utils/mapStatusHTTP';

async function verifyLogin(req: Request, res: Response) {
  const { username, password } = req.body;
  const ServiceResponse = await loginService.verifyLogin({ username, password });

  if (ServiceResponse.status !== 'SUCCESSFUL') {
    return res.status(mapStatusHTTP(ServiceResponse.status)).json(ServiceResponse.data);
  } 

  return res.status(200).json(ServiceResponse.data);
}

export default {
  verifyLogin,
};
