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
        countryCode:{
            type:Sequelize.STRING(3),
            allowNull: false
        },
        billingDocument: { // invoiceNo
            type:Sequelize.STRING(21),
            allowNull: false
        },
        billingType: { // invoiceType
            type:Sequelize.STRING(15),
            allowNull: false
        },
        documentCurrency: { // currencyName
            type:Sequelize.STRING(3),
            allowNull: false
        },
        companyCode: {
            type:Sequelize.STRING(15),
            allowNull: true
        },
        branch: {
            type:Sequelize.STRING(15),
            allowNull: true
        },
        billingDate:{
            type:Sequelize.DATEONLY,
            allowNull: false
        },
        fiscalYear:{
            type:Sequelize.STRING(4),
            allowNull: false
        },
        postingPeriod:{
            type:Sequelize.STRING(2),
            allowNull: false
        },
        billToParty:{ // customerId
            type: Sequelize.STRING(15),
            allowNull: false
        },
        billToPartyName:{ // customerId
            type: Sequelize.STRING,
            allowNull: false
        },

        customerGroup:{
            type: Sequelize.STRING(15),
            allowNull: false
        },
        acctAssmtGrpCust:{
            type: Sequelize.STRING(15),
            allowNull: false
        },
        vatRegistrationNo:{
            type: Sequelize.STRING(15),
            allowNull: true
        },
        paymentTerms:{
            type: Sequelize.STRING(15),
            allowNull: true
        },
        taxClass1Cust:{
            type: Sequelize.STRING(15),
            allowNull: true
        },
        netValue:{
            type: Sequelize.FLOAT(10,2),
            allowNull: true
        },
        taxAmount:{
            type: Sequelize.FLOAT(10,2),
            allowNull: true
        },
        roundingAdjustment:{
            type: Sequelize.FLOAT(10,2),
            allowNull: true
        },
        grossValue:{
            type: Sequelize.FLOAT(10,2),
            allowNull: true
        },
        postingStatus:{
            type: Sequelize.STRING(10),
            allowNull: true,
        },
        cancelled:{
            type: Sequelize.STRING,
            allowNull: true,
            defaultValue: ''
        },
        canceledBillDoc:{
            type: Sequelize.STRING,
            allowNull: true
        },
        cancelBillingDate:{
            type: Sequelize.DATE,
            allowNull: true
        },
        cancellationReason:{
            type: Sequelize.STRING,
            allowNull: true
        },
        referenceOrderDocument:{
            type: Sequelize.STRING(21),
            allowNull: true
        },
        paymentReference:{
            type: Sequelize.STRING,
            allowNull: true
        },
        voucherNumber:{
            type: Sequelize.STRING,
            allowNull: true
        },
        businessType:{ // from where?
            type: Sequelize.STRING,
            allowNull: true
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
            defaultValue: false
        },
        inactivateReason: {
            type: Sequelize.STRING,
            allowNull: true
        },
        createdBy: {
            type: Sequelize.STRING,
            allowNull: false
        },
        updatedBy: {
            type: Sequelize.STRING,
            allowNull: true
        },
        // createdAt: {
        //     type: Sequelize.DATE,
        //     allowNull: true,
        //     defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        //     field: 'createdAt'
        // },
        // updateAt: {
        //     type: Sequelize.DATE,
        //     allowNull: true,
        //     defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        //     field: 'updateAt'
        // }
    };
}