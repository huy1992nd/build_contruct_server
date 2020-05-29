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
        chargeType: {
            type: Sequelize.STRING
        },
        billTo: {
            type: Sequelize.STRING
        },
        invoiceNo:{
            type:Sequelize.STRING
        },
        billToName: {
            type: Sequelize.STRING
        },
        netTotalLabour: {
            type: Sequelize.STRING
        },
        netTotalSparePart: {
            type: Sequelize.STRING
        },
        totalTaxAmount: {
            type: Sequelize.STRING
        },
        totalPackage: {
            type: Sequelize.STRING
        },
        amountPayable: {
            type: Sequelize.STRING
        },
        appliedAmount: { // from paymentItem
            type: Sequelize.DECIMAL(10,2),
            allowNull: false,
            defaultValue: 0
        },
        invoiceStatus: {
            type: Sequelize.STRING
        },
        remarks: {
            type: Sequelize.STRING
        },
        roId: {
            type: Sequelize.STRING
        },
        totalLabourDiscount: {
            type: Sequelize.STRING
        },
        totalPartsDiscount: {
            type: Sequelize.STRING
        },
        depositAmountExcludingTax: {
            type: Sequelize.STRING
        },
        excessClause: {
            type: Sequelize.STRING
        },
        underInsured: {
            type: Sequelize.STRING
        },
        betterment: {
            type: Sequelize.STRING
        },
        customerPayableTax: {
            type: Sequelize.STRING
        },
        centRoundAdjustment: {
            type: Sequelize.STRING
        },
        paymentId: {
            type: Sequelize.UUID
        },
        createdBy: {
            type: Sequelize.STRING,
            allowNull: false
        },
        updatedBy: {
            type: Sequelize.STRING,
            allowNull: false
        },
    };
}