import { Model, DataTypes } from "sequelize";

class User extends Model {
  static init(sequelize) {
    super.init({
      nick: DataTypes.STRING,
      password_hash: DataTypes.STRING
    }, { sequelize });
  }

  static associate(models) {
    this.hasMany(models.Task, {
      foreignKey: "user_id",
      as: "tasks"
    });
  }
}

export default User;