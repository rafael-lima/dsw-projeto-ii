"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) =>
    await queryInterface.addColumn("tasks", "updated", {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false
    }),

  down: async (queryInterface, Sequelize) =>
    await queryInterface.removeColumn("tasks", "updated")
};