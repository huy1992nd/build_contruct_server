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
        paymentDate: {
            type: Sequelize.DATEONLY,
            allowNull: false
        },
        billTo: { // customerId
            type: Sequelize.UUID,
            allowNull: false
        },
        billToName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        branchId: {
            type: Sequelize.UUID,
            allowNull: false
        },
        paymentModeId: {
            type: Sequelize.UUID,
            allowNull: false
        },
        currencyId: {
            type: Sequelize.UUID,
            allowNull: false
        },
        paymentAmount: {
            type: Sequelize.DECIMAL(10,2),
            allowNull: false,
            defaultValue: 0
        },
        referenceNo: {
            type: Sequelize.STRING,
            // allowNull: false
        },
        receiptNo: {
            type: Sequelize.STRING,
            // allowNull: false
        },
        paymentStatus: {
            type: Sequelize.ENUM,
            allowNull: false,
            defaultValue: StatusEnum.PAYMENTSTATUS.OPEN,
            values: [StatusEnum.paymentStatus],
        },
        repairOrderId: {
            type: Sequelize.UUID,
            allowNull: true
        },
        referenceName: {
            type: Sequelize.STRING,
            allowNull: true
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
        }
    };
}