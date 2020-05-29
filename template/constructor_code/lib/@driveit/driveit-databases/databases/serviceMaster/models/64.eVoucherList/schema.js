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
        eVoucherCode: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        expiryDate: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        startDate: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        issuanceBranch: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        campaignCode: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        voucherStatus: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        campaignName: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        packageCode: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        packageName: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        chassisNo: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        registrationNo: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        utilisationDateTime: {
            type: Sequelize.DATE,
            allowNull: true,
        },
        utlisationOrderNumber: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        redemptionDateTime: {
            type: Sequelize.DATE,
            allowNull: true,
        },
        reasonOfVoiding: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        effectiveStartDate: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        effectiveEndDate: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        maxMilage: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        minMilage: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        maxSpendingAmount: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        minSpendingAmount: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        validityPerioid: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        deleted: {
            type: Sequelize.BOOLEAN
        },
        status: {
            type: Sequelize.ENUM,
            allowNull: false,
            defaultValue: StatusEnum.ENABLED,
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