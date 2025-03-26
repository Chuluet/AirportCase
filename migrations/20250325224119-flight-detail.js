"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("flightDetail", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      passengerFk: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "passenger",
          key: "id",
        },
        onDelete: "RESTRICT",
      },
      flightFk: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "flight",
          key: "id",
        },
        onDelete: "RESTRICT",
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("flightDetail");
  },
};
