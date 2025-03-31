'use strict';
const { Model, DataTypers, DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    class AirportServices extends Model {
        static associate(models) {
            // Definir asociaciones aquí si es necesario
        }
    }
    AirportServices.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }

    },
        {
            sequelize,
            modelName: "AirportServices",
            tableName: "airportServices", // Especificar nombre de la tabla
            timestamps: true, // Agrega createdAt y updatedAt
        }

    )
    return AirportServices
}