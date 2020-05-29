const Sequelize = require("sequelize");
const StatusEnum = require('../enums/Status');

module.exports = () => {
    return {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV1
        },
        makeId: {
            type: Sequelize.UUID,
            allowNull: false,
        },
        modelId: {
            type: Sequelize.UUID,
            allowNull: false,
        },
        jobId: {
            type: Sequelize.UUID,
            allowNull: false,
        },
        materialMasterBasicinfoId: {
            type: Sequelize.UUID,
            allowNull: false,
        },
        nextRecommendMileage: {
            type: Sequelize.DECIMAL(15, 6),
            allowNull: false
        },
        nextRecommendPeriod: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        nextRecommendPeriodUom: {
            type: Sequelize.STRING,
            allowNull: false
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
            allowNull: true,
            defaultValue: StatusEnum.ENABLED,
            values: [StatusEnum.status],
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
        },
        inactivateReason: {
            type: Sequelize.STRING,
            allowNull: false
        }
    };
}