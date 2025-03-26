'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("baggage", {
      id: {
                  type: Sequelize.UUID,
                  defaultValue: Sequelize.UUIDV4,
                  primaryKey: true
              },
              passengerId: {
                  type: Sequelize.UUID,
                  allowNull:false
                  
              },
              flightId: {
                  type: Sequelize.UUID,
                  allowNull:false
              },
              tagNumber: {
                  type: Sequelize.STRING,
                  defaultValue:Sequelize.UUIDV4,
                  unique: true
              },
              weight: {
                  type: Sequelize.DOUBLE,
                  allowNull: false
              },
              dimensions: {
                  type: Sequelize.STRING,
                  allowNull: false
              },
              status: {
                  type: Sequelize.ENUM("Checked-in","Arrived","Lost","In transit","Delayed"),
                  allowNull: false,
                  
              },
              checkInLocation: {
                  type: Sequelize.STRING,
                  allowNull: false
              },
              incidentDetails: {
                  type: Sequelize.STRING      
              },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("baggage");
  },
};

