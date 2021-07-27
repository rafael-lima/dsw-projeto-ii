import Sequelize from "sequelize";

import config from "../config/database.json";

import User from "../models/User";
import Task from "../models/Task";

const models = [User, Task];

class Database {
  constructor() {
    this.connection = new Sequelize(config);

    this.init();
    this.associations();
  }

  init() {
    models.forEach((model) => {
      model.init(this.connection);
    });
  }

  associations() {
    models.forEach((model) => {
      model.associate(this.connection.models);
    });
  }
}

export default new Database();