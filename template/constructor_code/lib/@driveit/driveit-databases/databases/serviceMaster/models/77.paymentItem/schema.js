const Sequelize = require("sequelize");
const StatusEnum = require('../enums/Status');
const errorDef = require('../../../../utils/error.codes');

module.exports = () => {
    return {
        id: {
            type: Sequelize.UUID, // topic series generate
            primaryKey: true,
            defaultValue: Sequelize.UUIDV1
        },
        repairOrderId: {
            type: Sequelize.UUID,
            // allowNull: false
        },
        repairOrderNo: {
            type: Sequelize.STRING,
            // allowNull: false
        },
        invoiceId: {
            type: Sequelize.UUID,
            // allowNull: false
        },
        invoiceNo: {
            type: Sequelize.STRING,
            // allowNull: false
        },
        billingId: {
            type: Sequelize.UUID,
            // allowNull: false
        },
        invoiceDate: {
            type: Sequelize.DATEONLY,
            allowNull: true // changed to true
        },
        currencyId: {
            type: Sequelize.UUID,
            allowNull: false
        },
        outstandingAmount: { // from billing.amountPayable
            type: Sequelize.DECIMAL(10,2),
            allowNull: false,
            defaultValue: 0
        },
        appliedAmount: { // update to billing.appliedAmount
            type: Sequelize.DECIMAL(10,2),
            allowNull: false,
            defaultValue: 0
        },
        status: {
            type: Sequelize.ENUM,
            allowNull: false,
            defaultValue: StatusEnum.ENABLED,
            values: [StatusEnum.status],
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
        },
        amountPayable: {
            type: Sequelize.STRING
        },
    };
}