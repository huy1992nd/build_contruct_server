const Sequelize = require("sequelize");
const CommissionsStatus = require('../enums/CommissionsStatus');
const AflStatusEnum = require('../enums/AflStatus');
const errorDef = require('../../../../utils/error.codes');
module.exports = () => {
    return {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV1
        },
        makeId: {
            type: Sequelize.STRING,
            allowNull: false
        },
        make: {
            type: Sequelize.STRING,
            allowNull: false
        },
        modelId: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        model: {
            type: Sequelize.STRING,
            allowNull: false
        },
        variantId: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        variant: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        productId: {
            type: Sequelize.STRING,
            allowNull: true
        },
        productName: {
            type: Sequelize.STRING,
            allowNull: true
        },
        startDate: {
            type: Sequelize.DATE,
            allowNull: true
        },
        endDate: {
            type: Sequelize.DATE,
            allowNull: true
        },
        registrationRegion: {
            type: Sequelize.STRING,
            defaultValue: false
        },

        tenantId: {
            type: Sequelize.STRING,
            allowNull: true
        },
        tenantBranchId: {
            type: Sequelize.STRING,
            allowNull: true
        },

        status: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: CommissionsStatus.FALSE,
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