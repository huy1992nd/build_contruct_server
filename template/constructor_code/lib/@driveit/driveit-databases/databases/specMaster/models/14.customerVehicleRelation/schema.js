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
        customerIdentityNo: {
            type: Sequelize.STRING,
        },
        customerName: {
            type: Sequelize.STRING,
        },
        phoneNo: {
            type: Sequelize.STRING,
        },
        regNo: {
            type: Sequelize.STRING,
        },
        action: {
            type: Sequelize.ENUM,
            allowNull: false,
            values: [ActionTypeEnum.action],
        },
        deleted: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        makeId: {
            type: Sequelize.STRING
        },
        modelId: {
            type: Sequelize.STRING
        },
        variantId: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        areaCode: {
            type: Sequelize.STRING
        },
        operatorCodeNumber:{
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.ENUM,
            allowNull: false,
            defaultValue: StatusEnum.ASSIGNED,
            values: [StatusEnum.status],
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