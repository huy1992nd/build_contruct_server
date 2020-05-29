const Sequelize = require("sequelize");
const errorDef = require('../../../../utils/error.codes');

module.exports = () => {
    return {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV1
        },
        
        registrationTypeId: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        registrationDate: {
            type: Sequelize.DATEONLY,
            allowNull: true
        },
        registrationNo: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        countryId: {
            type: Sequelize.STRING,
            allowNull: true,
        },

        customerId: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        customerName: {
            type: Sequelize.STRING,
            allowNull: true,
        },

        mileage: {
            type: Sequelize.INTEGER,
            allowNull: true
        },

        uomId: {
            type: Sequelize.STRING,
            allowNull: true,
        },

        deleted: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        
        createdBy: {
            type: Sequelize.STRING,
            allowNull: false
        },
        updatedBy: {
            type: Sequelize.STRING,
            allowNull: false
        },
        vehicleId: {
            type: Sequelize.UUID,
            references: {
                model: "vehicle", 
                key: "id", 
            }
        }
    };
}