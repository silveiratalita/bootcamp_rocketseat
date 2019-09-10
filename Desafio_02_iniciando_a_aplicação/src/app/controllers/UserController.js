import * as Yup from 'yup';
import { Request, Response, Router } from 'express';
import User from '../models/User/User';
import HttpException from '../../errors/HttpException';
import bcrypt from 'bcryptjs';
class UserController {
  // async checkPassword(password, password_hash) {
  //   try {
  //     const verifyPassword = await bcrypt.compare(password, password_hash);
  //     return verifyPassword;
  //   } catch (error) {
  //     return error;
  //   }
  // }

  async hashPassword(password) {
    const password_hash = bcrypt.hash(password, 10);
    return password_hash;
  }
  async createUser(req, res) {
    const { name, email, cellphone, password } = req.body;
    const user = new User(req.body);

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required(),
      password: Yup.string().required(),
      cellphone: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.send(
        new HttpException(404, 'Falha na validação das informações')
      );
    }

    try {
      const userExists = await User.findOne({ where: { email: email } });
    } catch (error) {
      console.log('UserExists: ' + error);
    }

    if (userExists) {
      return res.send(
        new HttpException(
          400,
          'Usuario já existe! Favor informar um email ianda não cadastrado!'
        )
      );
    }
    let userSaved;
    try {
      userSaved = await User.create(user);
    } catch (error) {
      console.log('userSaved: ' + error);
    }

    return res.json(userSaved);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
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
    const userUpdated = await req.body.user.update(req.body);
    return res.json(userUpdated);
  }
}
export default new UserController();
