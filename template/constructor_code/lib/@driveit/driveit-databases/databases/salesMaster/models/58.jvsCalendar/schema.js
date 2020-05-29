const Sequelize = require("sequelize");
const StatusEnum = require('../enums/Status');

module.exports = () => {
    return {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV1
        },
        year: {
            type: Sequelize.INTEGER(4),
            allowNull: false
        },
        defaultBranchCutoffDate: {
            type: Sequelize.DATE,
            allowNull: false
        },
        defaultFinanceCutoffDate: {
            type: Sequelize.DATE
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

        status: {
            type: Sequelize.ENUM,
            allowNull: false,
            defaultValue: StatusEnum.JVSTRANSACTIONSTATUS.INACTIVE,
            values: [StatusEnum.JvsTransactionStatus],
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