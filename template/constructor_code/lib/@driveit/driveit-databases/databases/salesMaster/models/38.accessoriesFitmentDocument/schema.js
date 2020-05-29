const Sequelize = require("sequelize");
const AfdStatusEnum = require('../enums/AfdStatus');
const errorDef = require('../../../../utils/error.codes');

module.exports = () => {
    return {
        id: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        
        afdDate: {
            type: Sequelize.DATE,
            allowNull: true
        },
        status: {
            type: Sequelize.ENUM,
            allowNull: false,
            defaultValue: AfdStatusEnum.NEW,
            values: [AfdStatusEnum.status]
        },
        printedDate: {
            type: Sequelize.DATE,
            allowNull: true
        },
        makeId: {
            type: Sequelize.STRING,
            allowNull: true
        },
        modelId: {
            type: Sequelize.STRING,
            allowNull: true
        },
        variantId: {
            type: Sequelize.STRING,
            allowNull: true
        },
        productId: {
            type: Sequelize.STRING,
            allowNull: true
        },
        vendorId: {
            type: Sequelize.STRING,
            allowNull: true
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