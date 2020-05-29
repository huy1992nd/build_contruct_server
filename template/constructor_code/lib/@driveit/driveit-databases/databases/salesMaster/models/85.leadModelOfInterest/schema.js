const Sequelize = require("sequelize");
const StatusEnum = require('../enums/Status');
const errorDef = require('../../../../utils/error.codes');

module.exports = () => {
    return {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV1
        },
        makeId: {
            type: Sequelize.CHAR(36),
            allowNull: false
        },
        modelId: {
            type: Sequelize.CHAR(36),
            allowNull: false
        },
        variantId: {
            type: Sequelize.CHAR(36),
            allowNull: false
        },
        productId: {
            type: Sequelize.CHAR(36),
            allowNull: false
        },
        quantity: {
            type: Sequelize.CHAR(36),
            allowNull: false
        },
        colorId: {
            type: Sequelize.CHAR(36),
            allowNull: true
        },
        vehicleUsageId: {
            type: Sequelize.CHAR(36),
            allowNull: true
        },
        testDriveDate: {
            type: Sequelize.DATEONLY,
            allowNull: true
        },
        deleted: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        createdBy: {
            type: Sequelize.STRING,
            allowNull: false
        },
        updatedBy: {
            type: Sequelize.STRING,
            allowNull: false
        },
        leadId: {
            type: Sequelize.CHAR(36),
            allowNull: false
        },
    };
}