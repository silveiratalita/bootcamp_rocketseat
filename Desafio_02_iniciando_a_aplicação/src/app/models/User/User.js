import { Sequelize, DataTypes, Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: {
              msg: 'Campo Vazio.',
            },
            notNull: {
              msg: 'Campo Nulo.',
            },
          },
        },
        email: {
          type: DataTypes.STRING,
          allowNull: true,
          unique: true,
          validate: {
            isEmail: {
              msg: 'Campo Vazio.',
            },
            notEmpty: {
              msg: 'Campo Nulo.',
            },
          },
        },
        cellphone: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          validate: {
            notEmpty: {
              msg: 'Campo Vazio.',
            },
            notNull: {
              msg: 'Campo Nulo.',
            },
          },
        },
        authToken: {
          type: DataTypes.STRING,
          allowNull: true,
          unique: true,
        },
        hashkey: {
          type: DataTypes.UUIDV4,
          allowNull: false,
          unique: true,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        password_hash: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        paranoid: true,
        timestamps: true,
      }
    );

    this.addHook('beforeSave', async user => {
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
      const verifyPassword = await bcrypt.compare(password, this.password_hash);
      return verifyPassword;
    } catch (error) {
      return error;
    }
  }
}

export default User;
