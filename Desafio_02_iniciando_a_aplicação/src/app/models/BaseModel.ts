import { Model } from 'sequelize';

class BaseModel extends Model {
  public readonly createdAt!: Date;

  public readonly updateAt!: Date;

  public readonly deletedAt!: Date;
}
export default BaseModel;
