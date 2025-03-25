"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class flightDetail extends Model {
    static associate(models) {
      flightDetail.belongsTo(models.passenger, { foreignKey: "passengerFk", as: "passenger" });
      flightDetail.belongsTo(models.flight, { foreignKey: "flightFk", as: "flights" });
    }
  }

  flightDetail.init(
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
      },
    },
    {
      sequelize,
      modelName: "flightDetail",
      tableName: "flightDetail",
      timestamps: true,
    }
  );

  return flightDetail;
};
