import { Model, DataTypes } from "sequelize";

class Task extends Model {
  static init(sequelize) {
    super.init({
      text: DataTypes.STRING,
      date: DataTypes.DATE,
      done: DataTypes.BOOLEAN,
      status: DataTypes.ENUM("ACTIVE", "ARCHIVED"),
      updated: DataTypes.BOOLEAN
    }, { sequelize });
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "user"
    })
  }
}

export default Task;