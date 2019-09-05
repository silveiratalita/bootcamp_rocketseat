import * as Yup from 'yup';
import Controller from './Controller';
import { Request, Response, Router } from 'express';
import User from '../models/User/User';
import { UserAttributes } from '../models/User/User';
import HttpException from '../../errors/HttpException';
class UserController extends Controller {
  private path = '/users';

  public router = Router();

  public async store(req: Request, res: Response): Promise<Response> {
    const { name, email, cellphone, password } = req.body;

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required(),
      password: Yup.string().required(),
      cellphone: Yup.string(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.send(new HttpException(404, 'Usuario não encontrado!'));
    }
    const userExists = await User.findOne({ where: email });
    if (!userExists) {
      return res.send(new HttpException(404, 'Usuario não encontrado!'));
    }
    const userSaved = await User.create(req.body);

    return res.json({ userSaved });
  }
}
