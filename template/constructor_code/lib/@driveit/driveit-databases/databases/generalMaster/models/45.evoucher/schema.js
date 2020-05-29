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
        campaignId: {
            type: Sequelize.STRING,
            allowNull: false,
            //defaultValue: Sequelize.UUIDV1
        },
        issuanceType: {
            type: Sequelize.STRING,
            allowNull: false
        },
        prefix: {
            type: Sequelize.STRING,
        },
        type: {
            type: Sequelize.STRING,
        },
        source: {
            type: Sequelize.STRING,
        },
        effectiveStartData: {
            type: Sequelize.STRING,
        },
        effectiveEndDate: {
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
        code: {
            type: Sequelize.STRING
        },

        tenantId: {
            type: Sequelize.UUID,
            allowNull: true
        },
        companyId: {
            type: Sequelize.UUID,
            allowNull: true
        },
        branchId: {
            type: Sequelize.UUID,
            allowNull: true
        },

        deleted: {
            type: Sequelize.BOOLEAN
        }

    }
}