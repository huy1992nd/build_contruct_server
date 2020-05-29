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
        accountingBranch: {
            type: Sequelize.STRING,
        },
        internalAccountingPPG: {
            type: Sequelize.STRING,
        },
        externalAccountingPPG: {
            type: Sequelize.STRING,
        },
        accountingValuationStrategy: {
            type: Sequelize.STRING,
        },
        workShopStock: {
            type: Sequelize.BOOLEAN,
        },
        accountingValuationPrice: {
            type: Sequelize.STRING,
        },
        accountingValidityStartDate: {
            type: Sequelize.STRING,
        },
        accountingValidityEndDate: {
            type: Sequelize.STRING,
        },
        accountingtotalStock: {
            type: Sequelize.STRING,
        },
        accountingTotalValue: {
            type: Sequelize.STRING,
        },
        accountingBranchName: {
            type: Sequelize.STRING,
        },
        accountingcurrencyName: {
            type: Sequelize.STRING,
        },
        createdBy: {
            type: Sequelize.STRING,
            allowNull: false
        },
        updatedBy: {
            type: Sequelize.STRING,
            allowNull: false
        },
        deleted: {
            type: Sequelize.BOOLEAN
        }
    }
}