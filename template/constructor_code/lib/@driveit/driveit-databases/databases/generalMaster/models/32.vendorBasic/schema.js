const Sequelize = require("sequelize");
const StatusEnum = require('../enums/Status');
const errorDef = require('../../../../utils/error.codes');

module.exports = () => {
    return {
        id: {
            type: Sequelize.STRING,
            primaryKey: true,
            //defaultValue: Sequelize.UUIDV1
        },
        vendorName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        companyRegistrationNo: {
            type: Sequelize.STRING,
            allowNull: false
        },
        vendorType: {
            type: Sequelize.STRING,
            allowNull: false
        },
        masterVendorId: {
            type: Sequelize.STRING,
            allowNull: true
        },
        status: {
            type: Sequelize.ENUM,
            allowNull: false,
            defaultValue: StatusEnum.ENABLED,
            values: [StatusEnum.status]
        },
        financierTypeId: {
            type: Sequelize.UUID,
            allowNull: true
        },
        remarks: {
            type: Sequelize.STRING,

        },
        vendorAccountGroupName: {
            type: Sequelize.STRING,
            allowNull: true
        },
        currencyId: {
            type: Sequelize.STRING
        },
        ibsCode: {
            type: Sequelize.STRING,
            allowNull: true
        },
        jpjInsurerCode: {
            type: Sequelize.STRING,
            allowNull: true
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
        },
        inactivateReason: {
            type: Sequelize.STRING
        }
    }
}