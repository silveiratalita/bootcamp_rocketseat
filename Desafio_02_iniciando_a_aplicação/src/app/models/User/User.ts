import { Sequelize, DataTypes } from 'sequelize';

import BaseModel from '../BaseModel';

class User extends BaseModel {
  public id!: number;

  public name!: string;

  public email?: string;

  public cellphone!: string;

  public authToken?: string;

  public hashkey!: string;

  public password!: string;

  public password_hash!: string;
}

function initUser(sequelize: Sequelize): typeof User {
  User.init(
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
        defaultValue: uuid,
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

  return User;
}
export interface UserAttributes {
  id: number;
  name: string;
  email: string;
  cellphone: string;
  hashkey: string;
  password: string;
}

export { initUser };

export default User;
