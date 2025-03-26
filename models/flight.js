'use strict';
const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize) => {
  class Flight extends Model {
    static associate(models) {
      // Definir asociaciones aquí si es necesario
    }

    // Método para comparar la contraseña ingresada con la almacenada
    
  }

  Flight.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
          },
          flightNumber: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
          },
          airline: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          departureAirport: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          arrivalAirport: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          departureTime: {
            type: DataTypes.DATE,
            allowNull: false,
          },
          arrivalTime: {
            type: DataTypes.DATE,
            allowNull: false,
          },
          route: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          status: {
            type: DataTypes.ENUM("Scheduled", "In Progress", "Delayed", "Canceled"),
            allowNull: false,
            defaultValue: "Scheduled",
          },
          boardingGate: {
            type: DataTypes.STRING,
            allowNull: true,
          },
          aircraftType: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          baggageClaim: {
            type: DataTypes.STRING,
            allowNull: true,
          }
    },
    {
      sequelize,
      modelName: "Flight",
      tableName: "flight",
      timestamps: true,

      // Hook para cifrar la contraseña antes de guardar
     
    }
  );

  return Flight;
};