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
        branch: {
            type: Sequelize.STRING,
        },
        make: {
            type: Sequelize.STRING,
        },

        validStartDate: {
            type: Sequelize.STRING,
            allowNull: false
        },
        validEndDate: {
            type: Sequelize.STRING,
            allowNull: false
        },
        vendor: {
            type: Sequelize.STRING,
            allowNull: true
        },
        vendorMaterialNo: {
            type: Sequelize.STRING,
            allowNull: true
        },

        procurementMakeName: {
            type: Sequelize.STRING,
        },
        procurementBranchName: {
            type: Sequelize.STRING,
        },
        procurementUomName: {
            type: Sequelize.STRING,
        },

        itemCategory: {
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
        customerName: {
            type: Sequelize.STRING,
            allowNull: true
        },
        customerId: {
            type: Sequelize.STRING,
            allowNull: true
        },
    }
}