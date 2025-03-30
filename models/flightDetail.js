"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class FlightDetail extends Model {
    static associate(models) {
      FlightDetail.belongsTo(models.Passenger, { foreignKey: "passengerFk", as: "passenger" });
      FlightDetail.belongsTo(models.Flight, { foreignKey: "flightFk", as: "flights" });
    }
  }

  FlightDetail.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      passengerFk: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "passenger",
          key: "id",
        },
        onDelete: "RESTRICT",
      },
      flightFk: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "flight",
          key: "id",
        },
        onDelete: "RESTRICT",
      }
    },
    {
      sequelize,
      modelName: "FlightDetail",
      tableName: "flightDetail",
      timestamps: true,
    }
  );

  return FlightDetail;
};
