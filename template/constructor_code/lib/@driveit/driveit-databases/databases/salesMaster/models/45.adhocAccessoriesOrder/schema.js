const Sequelize = require("sequelize");
const StatusEnum = require('../enums/Status');
const aflStatusEnum = require('../enums/AflStatus');
const adhocAccesorriesStatusEnum = require('../enums/AdhocAccesorriesStatus');
const errorDef = require('../../../../utils/error.codes');
module.exports = () => {
    return {
        id: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        vehicleId: {
            type: Sequelize.STRING,
            allowNull: false
        },
        compulsoryPackageIds: {
            type: Sequelize.STRING,
            allowNull: true
        },
        optionalPackageIds: {
            type: Sequelize.STRING,
            allowNull: true
        },
        optionalItemIds: {
            type: Sequelize.STRING,
            allowNull: true
        },
        status: {
            type: Sequelize.ENUM,
            allowNull: false,
            defaultValue: adhocAccesorriesStatusEnum.NEW,
            values: [adhocAccesorriesStatusEnum.status]
        },
        aflStatus: {
            type: Sequelize.ENUM,
            allowNull: true,
            defaultValue: null,
            values: [aflStatusEnum.status]
        },
        cancelReason: {
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

        dropPointId: {
            type: Sequelize.STRING,
            allowNull: true
        },
      /*   vehicleBookingId: {
            type: Sequelize.UUID,
            allowNull: true
        }, */

        packageId: {
            type: Sequelize.STRING,
            allowNull: true
        },
        productId: {
            type: Sequelize.STRING,
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