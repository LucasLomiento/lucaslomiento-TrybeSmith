// src/middlewares/auth.middleware.ts

import { NextFunction, Request, Response } from 'express';
import jwtUtil from '../auth/validateJTW';
import UserModel from '../database/models/user.model';

async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Token é obrigatório' });
  }

  try {
    const decoded = await jwtUtil.verify(authorization);
    const user = await UserModel.findOne({ where: { username: decoded.username } });
    if (!user) return res.status(401).json({ message: 'Token inválido' }); 
    
    next();
  } catch (e) {
    return res.status(401).json({ message: 'Token inválido' });
  }
}

export default authMiddleware;