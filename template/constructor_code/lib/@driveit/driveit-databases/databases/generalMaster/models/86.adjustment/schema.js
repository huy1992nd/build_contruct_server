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
        adjustmentType:{
            type:Sequelize.STRING,
            allowNull: false
        },
        branchId: { // invoiceNo
            type:Sequelize.UUID,
            allowNull: false
        },
        reason: {
            type: Sequelize.STRING,
            // allowNull: false
        },
        remarks: {
            type: Sequelize.STRING,
            // allowNull: false
        },
        printDate: {
            type: Sequelize.DATEONLY,
            allowNull: true
        },
        status: {
            type: Sequelize.ENUM,
            allowNull: false,
            defaultValue: StatusEnum.ADJUSTMENT_KEYS.NEW,
            values: [StatusEnum.adjustmentStatus],
        },
        deleted: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        createdBy: {
            type: Sequelize.STRING,
            allowNull: false
        },
        updatedBy: {
            type: Sequelize.STRING,
            allowNull: true
        }
    };
}