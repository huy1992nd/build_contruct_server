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
        salesIdCount: {
            type: Sequelize.STRING,
        },
        salesbranch: {
            type: Sequelize.STRING,
        },
        salesMakeName: {
            type: Sequelize.STRING,
        },
        salesBranchName: {
            type: Sequelize.STRING,
        },
        salesPurchaseUomName: {
            type: Sequelize.STRING,
        },
        salesMake: {
            type: Sequelize.STRING,
        },
        salesValidityStartDate: {
            type: Sequelize.STRING,
            allowNull: false
        },
        salesValidityEndDate: {
            type: Sequelize.STRING,
            allowNull: false
        },
        salesPurchaseUom: {
            type: Sequelize.UUID,
            allowNull: false
        },
        taxClassInicator: {
            type: Sequelize.STRING,
        },
        salesStatus: {
            type: Sequelize.BOOLEAN,
        },
        taxClassIndicatorname: {
            type: Sequelize.STRING,
        },
        createdBy: {
            type: Sequelize.STRING,
            allowNull: false
        },
        updatedBy: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }
}