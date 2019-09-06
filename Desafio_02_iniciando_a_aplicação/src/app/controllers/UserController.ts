import * as Yup from 'yup';
import Controller from './Controller';
import { Request, Response, Router } from 'express';
import User from '../models/User/User';
import HttpException from '../../errors/HttpException';
import * as bcrypt from 'bcryptjs';
class UserController extends Controller {
  public async checkPassword(
    password: string,
    password_hash: string
  ): Promise<boolean> {
    try {
      const verifyPassword = await bcrypt.compare(password, password_hash);
      return verifyPassword;
    } catch (error) {
      return error;
    }
  }
  public async createUser(req: Request, res: Response): Promise<Response> {
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

  public async update(req: Request, res: Response): Promise<Response> {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .min(6)
        .when('oldPassword', (oldPassword: string, field: any) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when(
        'password',
        (password: string, field: any) =>
          password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.send(
        new HttpException(401, 'Ocorreu um erro com as informações enviadas.')
      );
    }
    const { email, oldPassword, password } = req.body;
    const user = await User.findOne(req.body.user.id);
    if (email !== email) {
      const userExists = await User.findOne({ where: email });
      if (userExists) {
        return res.send(new HttpException(400, 'Usuário já existe!'));
      }
      if (
        oldPassword &&
        !(await this.checkPassword(oldPassword, req.body.user.password_hash))
      ) {
        return res.status(400).json({ error: 'A senha não bate' });
      }
    }
    const userUpdated: User = await req.body.user.update(req.body);
    return res.json(userUpdated);
  }
}
export default new UserController();
