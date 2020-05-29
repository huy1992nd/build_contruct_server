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
        warrantyTolleranceKM: {
            type: Sequelize.STRING
        },
        warrantyTolleranceMonths: {
            type: Sequelize.STRING
        },
        reimburserId: {
            type: Sequelize.STRING,
        },
        reimburserName: {
            type: Sequelize.STRING,
        },
        warrantyCategory: {
            type: Sequelize.STRING,
        },
        warrantyCategoryName: {
            type: Sequelize.STRING
        },
        // warrantyId: {
        //     type: Sequelize.CHAR(36)
        // },
        // warrantyId: {
        //     type: Sequelize.UUID,
        //     allowNull: false,
        //     references: { model: 'materialMasterBasicinfo', key: 'id' },
        // },
      
        deleted: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        warrantyOriginPart: {
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