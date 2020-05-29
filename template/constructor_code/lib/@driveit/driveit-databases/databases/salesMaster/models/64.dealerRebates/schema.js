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
        makeId: {
            type: Sequelize.STRING,
            allowNull: false
        },
        modelId: {
            type: Sequelize.STRING,
            allowNull: false
        },
        variantId: {
            type: Sequelize.STRING,
            allowNull: false
        },
        productId: {
            type: Sequelize.STRING,
            allowNull: false
        },
        effectiveStartDate: {
            type: Sequelize.DATEONLY,
            allowNull: false
        },
        effectiveEndDate: {
            type: Sequelize.DATEONLY,
            allowNull: false
        },
        // registrationRegions: {
        //     type: Sequelize.STRING,
        //     allowNull: false
        // },

        tenantId: {
            type: Sequelize.STRING,
            allowNull: true
        },
        tenantBranchId: {
            type: Sequelize.STRING,
            allowNull: true
        },

        status: {
            type: Sequelize.ENUM,
            allowNull: false,
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
        }
        // dealerRebatesId:{
        //     type: Sequelize.STRING,
        //     refernces : {
        //         model: 'dealerRebatesId', 
        //         key: 'id'
        //     }
        // }
    };
}