'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addColumn("user", "state", {
      type: Sequelize.ENUM("Active", "Inactive"),
      allowNull: false,
      defaultValue: "Active",
    });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.removeColumn("user", "state");
  }
};