'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Passenger extends Model {
        static associate(models) {
            Passenger.hasMany(models.FlightDetail, {foreignKey: "passengerFk", as: "flightDetail"});
            Passenger.hasMany(models.Baggage, { foreignKey: "passengerFk" });
        }
    }

    Passenger.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        passportId: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        seatPreference: {
            type: DataTypes.ENUM("Window", "Aisle", "Extra Legroom", "No Preference"),
            defaultValue: "No Preference"
        },
        mealPreference: {
            type: DataTypes.STRING,
            defaultValue: "No Preference"
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    }, {
        sequelize,
        modelName: "Passenger",
        tableName: "passenger",
        timestamps: true,
    });

    return Passenger;
};
