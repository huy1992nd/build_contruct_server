const Sequelize = require("sequelize");
const ActionTypeEnum = require('../enums/actionType');
const StatusEnum = require('../enums/CustomerVehicleRelationStatus');
const errorDef = require('../../../../utils/error.codes');

module.exports = () => {
    return {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV1
        },
        customerId: {
            type: Sequelize.STRING,
            allowNull: true
        },
        // vehicleId: {
        //     type: Sequelize.UUID,
        //     allowNull: true
        // },
        
        validFrom: {
            type: Sequelize.DATE
        },
        validTo: {
            type: Sequelize.DATE
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
        }
    };
}