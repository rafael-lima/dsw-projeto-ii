"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) =>
    await queryInterface.addColumn("tasks", "user_id", {
      type: Sequelize.INTEGER,
      references: {
        model: "users",
        key: "id"
      },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
      allowNull: false
    }),

  down: async (queryInterface, Sequelize) =>
    await queryInterface.removeColumn("tasks", "user_id")
};