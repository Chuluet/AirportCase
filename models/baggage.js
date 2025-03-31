'use strict';
const { Model, DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    class Baggage extends Model {
        static associate(models) {
            Baggage.belongsTo(models.Passenger, { foreignKey: "passengerFk", as: "passenger" });
        }
    }
    Baggage.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        passengerFk: {
            type: DataTypes.UUID,
            allowNull:false
            
        },
        flightFk: {
            type: DataTypes.UUID,
            allowNull:false
        },
        tagNumber: {
            type: DataTypes.STRING,
            defaultValue:DataTypes.UUIDV4,
            unique: true
        },
        weight: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        dimensions: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM("Checked-in","Arrived","Lost","In transit","Delayed"),
            allowNull: false,
            
        },
        checkInLocation: {
            type: DataTypes.STRING,
            allowNull: false
        },
        incidentDetails: {
            type: DataTypes.STRING      
        }

    },
        {
            sequelize,
            modelName: "Baggage",
            tableName: "baggage", // Especificar nombre de la tabla
            timestamps: true, // Agrega createdAt y updatedAt
        }

    )
    return Baggage
}