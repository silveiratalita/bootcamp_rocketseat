import Sequelize, { Model } from "sequelize";
import bcrypt from "bcryptjs";

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        provider: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );
    this.addHook("beforeSave", async user => {
      try {
        if (user.password) {
          console.log(`user: ${user}`);
          user.password_hash = await bcrypt.hash(user.password, 10);
        }
      } catch (error) {
        console.log(`erro: ${error}`);
      }
    });

    return this;
  }

  async chekPassword(password) {
    try {
      const a = await bcrypt.compare(password, this.password_hash);
      return a;
    } catch (error) {
      return error;
    }
  }
}

export default User;
