import bcrypt from 'bcryptjs';
import UserModel from '../database/models/user.model';
import jtwUtil from '../auth/validateJTW';
import { LoginRequest } from '../types/User';
import { ServiceResponse } from '../types/ServiceResponse';
import { Token } from '../types/Token';

async function verifyLogin(login: LoginRequest): Promise<ServiceResponse<Token>> {
  const { username, password } = login;

  if (!username || !password) {
    return { status: 'INVALID_DATA', data: { message: '"username" and "password" are required' } };
  }

  const foundUser = await UserModel.findOne({ where: { username } });
  
  if (!foundUser || !bcrypt.compareSync(password, foundUser.dataValues.password)) {
    return { status: 'UNAUTHORIZED', data: { message: 'Username or password invalid' } };
  }
  
  const { id: foundId, username: foundName } = foundUser.dataValues;

  const token = jtwUtil.sign({ id: foundId, username: foundName });
  
  return { status: 'SUCCESSFUL', data: { token } };
}

export default {
  verifyLogin,
};