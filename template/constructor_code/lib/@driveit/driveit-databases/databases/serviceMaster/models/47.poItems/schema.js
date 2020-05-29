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
        code: {
            type: Sequelize.STRING,
            allowNull: false
        },
        description: {
            type: Sequelize.STRING,
            allowNull: false
        },
        quantity: {
            type: Sequelize.STRING,
            allowNull: false
        },
        unitCost: {
            type: Sequelize.STRING,
            allowNull: true
        },
        unitSellingPrice: {
            type: Sequelize.STRING,
            allowNull: true
        },
        totalSellingPrice: {
            type: Sequelize.STRING,
            allowNull: true
        },
        totalCost: {
            type: Sequelize.STRING,
            allowNull: true
        },
        supplierInvoiceNo: {
            type: Sequelize.STRING,
            allowNull: true
        },
        supplierInvoiceDate: {
            type: Sequelize.STRING,
            allowNull: true
        },
        supplierInvoiceUpdate: {
            type: Sequelize.STRING,
            allowNull: true
        },
        deliveryOrderNo: {
            type: Sequelize.STRING,
            allowNull: true
        },
        deliveryTo: {
            type: Sequelize.STRING,
            allowNull: true
        },
        deliveryAddress: {
            type: Sequelize.STRING,
            allowNull: true
        },
        itemCategory: {
            type: Sequelize.STRING,
            allowNull: true
        },
        relatedJobs: {
            type: Sequelize.STRING,
            allowNull: true
        },
        arrivalDate: {
            type: Sequelize.STRING,
            allowNull: true,
            defaultValue: null
        },
        status: {
            type: Sequelize.ENUM,
            allowNull: true,
            defaultValue: StatusEnum.ENABLED,
            values: [StatusEnum.poItemstatus],
        },
        remark: {
            type: Sequelize.STRING,
            allowNull: true
        },
        inactivateReason: {
            type: Sequelize.STRING,
            allowNull: true
        },
        workshopStocks: {
            type: Sequelize.BOOLEAN,
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
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
    };
}