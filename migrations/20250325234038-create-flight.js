'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("flight",{
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      flightNumber: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      airline: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      departureAirport: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      arrivalAirport: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      departureTime: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      arrivalTime: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      route: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM("Scheduled", "In Progress", "Delayed", "Canceled"),
        allowNull: false,
        defaultValue: "Scheduled",
      },
      boardingGate: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      aircraftType: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      baggageClaim: {
        type: Sequelize.STRING,
        allowNull: true,
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
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("flight");
  }
};
