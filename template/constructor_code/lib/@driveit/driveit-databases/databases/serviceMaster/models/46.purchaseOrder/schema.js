const Sequelize = require("sequelize");
const PoStatus = require('../enums/Status');
const errorDef = require('../../../../utils/error.codes');

module.exports = () => {
    return {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV1
        },
        poDate: {
            type: Sequelize.DATEONLY,
            allowNull: false
        },
        poType: {
            type: Sequelize.STRING,
            allowNull: true
        },
        poGeneratedBy: {
            type: Sequelize.STRING,
            allowNull: true
        },
        poNumber: {
            type: Sequelize.STRING,
            allowNull: true
        },
        status: {
            type: Sequelize.ENUM,
            allowNull: false,
            defaultValue: 'Pending',
            values: [PoStatus.postatus],
        },
        remark: {
            type: Sequelize.STRING,
            allowNull: true
        },
        inactivateReason: {
            type: Sequelize.STRING,
            allowNull: true
        },
        createdBy: {
            type: Sequelize.STRING,
            allowNull: true
        },
        updatedBy: {
            type: Sequelize.STRING,
            allowNull: true
        },
        vendorBasicId: {
            type: Sequelize.STRING,
            allowNull: false
        },
        vendorName: {
            type: Sequelize.STRING,
            allowNull: true
        },
        supplierAddress: {
            type: Sequelize.STRING,
            allowNull: false
        },
        supplierPhone: {
            type: Sequelize.STRING,
            allowNull: false
        },
        companyId: {
            type: Sequelize.STRING,
            allowNull: false
        },
        billingAddress: {
            type: Sequelize.STRING,
            allowNull: false
        },
        billingPhone: {
            type: Sequelize.STRING,
            allowNull: false
        },
        roNumber: {
            type: Sequelize.STRING,
            allowNull: true
        },
        roDate: {
            type: Sequelize.DATEONLY,
            allowNull: true
        },
        customerName: {
            type: Sequelize.STRING,
            allowNull: true
        },
        modelVariant: {
            type: Sequelize.STRING,
            allowNull: true
        },
        registrationNo: {
            type: Sequelize.STRING,
            allowNull: true
        },
        chassisNo: {
            type: Sequelize.STRING,
            allowNull: true
        },
        engineNo: {
            type: Sequelize.STRING,
            allowNull: true
        },
        branchId: {
            type: Sequelize.UUID,
            allowNull: true
        },
        deliveryCode: {
            type: Sequelize.STRING,
            allowNull: true
        },
        deliveryName: {
            type: Sequelize.STRING,
            allowNull: true
        },

        deliveryAddress: {
            type: Sequelize.STRING,
            allowNull: true
        },
        deliveryPhone: {
            type: Sequelize.STRING,
            allowNull: true
        },
        paymentMode: {
            type: Sequelize.STRING,
            allowNull: true
        },
        cancelationReason:{
            type: Sequelize.STRING,
            allowNull: true
        },
        deleted: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
    };
}