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
        particulars: {
            type: Sequelize.STRING,
            allowNull: false
        },
        quantity: {
            type: Sequelize.STRING,
            allowNull: false
        },
        costPerUnit: {
            type: Sequelize.STRING,
            allowNull: false
        },
        purchaseAmount: {
            type: Sequelize.STRING,
            allowNull: false
        },
        chargeableAmount: {
            type: Sequelize.STRING,
            allowNull: false
        },
        localPurchaseOrderId: {
            type: Sequelize.STRING,
            allowNull:false,
            references: { model: 'localPurchaseOrder', key: 'id'},
        },
        status: {
            type: Sequelize.ENUM,
            allowNull: false,
            defaultValue: StatusEnum.ENABLED,
            values: [StatusEnum.status],
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