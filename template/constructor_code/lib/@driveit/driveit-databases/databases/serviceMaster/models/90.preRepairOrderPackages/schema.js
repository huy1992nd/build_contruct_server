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
        chargeType:{
            type: Sequelize.STRING,
            allowNull: true
        },
        quantity:{
            type: Sequelize.INTEGER,
            allowNull: true
        },
        billTo:{
            type: Sequelize.STRING, 
            allowNull: true
        },
        billToName: {
            type: Sequelize.STRING,
             allowNull: true
        },
        taxAmount: {
            type: Sequelize.DECIMAL(15, 6),
            allowNull: true
        },
        totalAmount: {
            type: Sequelize.DECIMAL(15, 6),
            allowNull: true
        },
        preRepairOrderId: {
            type: Sequelize.UUID,
            references: {
                model: 'PreRepairOrder',
                key: 'id'
            },
        },
        servicePackageId: {
            type: Sequelize.UUID,
            references: {
                model: 'servicePackage',
                key: 'id'
            },
        },
        status: {
            type: Sequelize.ENUM,
            allowNull: false,
            defaultValue: StatusEnum.NEW,
            values: [StatusEnum.roStatus],
        },
        inactivateReason: {
            type: Sequelize.STRING,
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
        }
    };
}