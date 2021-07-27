"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) =>
    await queryInterface.addColumn("tasks", "status", {
      type: Sequelize.ENUM("ACTIVE", "ARCHIVED"),
      defaultValue: "ACTIVE",
      allowNull: false
    }),

  down: async (queryInterface, Sequelize) =>
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.removeColumn("tasks", "status");

      await queryInterface.sequelize.query("DROP TYPE enum_empresas_status", {
        transaction
      });
    })
};