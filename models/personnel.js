'use strict';
const { Model, DataTypers, DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    class Personnel extends Model {
        static associate(models) {
            // Definir asociaciones aquí si es necesario
        }
    }
    Personnel.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        personId: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.ENUM('Pilot', 'Cabin Crew', 'Security', 'Ground Staff', 'Customer Service'),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        phone: {
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
            modelName: "Personnel",
            tableName: "personnel", // Especificar nombre de la tabla
            timestamps: true, // Agrega createdAt y updatedAt
        }

    )
    return Personnel
}