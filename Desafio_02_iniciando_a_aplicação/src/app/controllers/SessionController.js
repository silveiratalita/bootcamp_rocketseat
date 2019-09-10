import jwt from 'jsonwebtoken';
import User from '../models/User';
import authConfig from '../../config/auth';
import HttpException from '../../errors/HttpException';

class SessionController {
  async useSession(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.send(new HttpException(401, 'O usuário informado não existe'));
    }
    if (!(await user.chekPassword(password))) {
      return res.send(new HttpException(400, 'A senha nao bate'));
    }
    const { id, name } = user;
    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}
export default new SessionController();
