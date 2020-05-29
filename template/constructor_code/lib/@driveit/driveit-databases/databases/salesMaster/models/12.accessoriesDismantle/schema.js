const Sequelize = require("sequelize");
const StatusEnum = require('../enums/AdlStatus');
const errorDef = require('../../../../utils/error.codes');
module.exports = () => {
    return {
        id: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        
        status: {
            type: Sequelize.ENUM,
            allowNull: false,
            defaultValue: StatusEnum.NEW,
            values: [StatusEnum.status]
        },

        chassisNo: {
            type: Sequelize.STRING,
            allowNull: true
        },
        vehicleId: {
            type: Sequelize.STRING,
            allowNull: true
        },

        tenantId: {
            type: Sequelize.UUID,
            allowNull: true
        },
        tenantCompanyId: {
            type: Sequelize.UUID,
            allowNull: true
        },
        tenantBranchId: {
            type: Sequelize.UUID,
            allowNull: true
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
            allowNull: false
        }
    };
}