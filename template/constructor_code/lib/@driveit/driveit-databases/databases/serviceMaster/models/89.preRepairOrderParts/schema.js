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
        workshopStocks: {
            type: Sequelize.BOOLEAN,
            allowNull: true
        },
        quantity: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        billTo: {
            type: Sequelize.STRING,
            allowNull: true
        },
        discountAmount: {
            type: Sequelize.DECIMAL(15, 6),
            allowNull: true
        },
        discountPercent: {
            type: Sequelize.DECIMAL(15, 6),
            allowNull: true
        },
        taxAmount: {
            type: Sequelize.DECIMAL(15, 6),
            allowNull: true
        },
        totalAmount: {
            type: Sequelize.DECIMAL(15, 6),
            allowNull: true
        },
        unitAmount: {
            type: Sequelize.STRING,
            allowNull: true
        },
        materialMasterId: {
            type: Sequelize.STRING
        },
        materialId: {
            type: Sequelize.STRING
        },
        uomId: {
            type: Sequelize.STRING
        },
        amount: {
            type: Sequelize.STRING
        },
        billToName: {
            type: Sequelize.STRING,
             allowNull: true
        },
        chargeType: {
            type: Sequelize.STRING
        },
        preRepairOrderId: {
            type: Sequelize.UUID,
            references: {
                model: 'PreRepairOrder',
                key: 'id'
            },
        },
        jobsId: {
            type: Sequelize.UUID,
            references: {
                model: 'jobs',
                key: 'id'
            },
        },
        servicePackageId: {
            type: Sequelize.UUID,
            references: {
                model: 'servicePackage',
                key: 'id'
            },
        },
        currencyId: {
            type: Sequelize.STRING
        },
        resolvedStatus: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        warrantyIncidentId: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.ENUM,
            allowNull: false,
            defaultValue: StatusEnum.NEW,
            values: [StatusEnum.roStatus],
        },
        inactivateReason: {
            type: Sequelize.STRING,
            allowNull: true
        },
        deleted: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false,
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