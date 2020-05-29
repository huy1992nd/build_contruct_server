const Sequelize = require("sequelize");
const StatusEnum = require('../enums/Status');

module.exports = () => {
    return {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV1
        },
        warrantyApprovalIncidentId: {
            type: Sequelize.UUID,
            allowNull: false
        },
        jobsId: {
            type: Sequelize.UUID
        },
        servicePackageId: {
            type: Sequelize.UUID
        },
        chargeType: {
            type: Sequelize.STRING
        },
        billTo: {
            type: Sequelize.UUID
        },
        billToName: {
            type: Sequelize.STRING
        },
        amount: {
            type: Sequelize.DECIMAL(15, 2)
        },
        unitAmount: {
            type: Sequelize.DECIMAL(15, 2)
        },
        discountPercent: {
            type: Sequelize.DECIMAL(15, 2)
        },
        discountAmount: {
            type: Sequelize.DECIMAL(15, 2)
        },
        taxAmount: {
            type: Sequelize.DECIMAL(15, 2)
        },
        totalAmount: {
            type: Sequelize.DECIMAL(15, 2)
        },
        workshopStocks: {
            type: Sequelize.BOOLEAN
        },
        quantity: {
            type: Sequelize.INTEGER
        },
        uomId: {
            type: Sequelize.UUID
        },
        uomName: {
            type: Sequelize.UUID
        },
        jobPartId: {
            type: Sequelize.UUID
        },
        partGroupId: {
            type: Sequelize.UUID
        },
        status: {
            type: Sequelize.STRING
        },
        resolvedStatus: {
            type: Sequelize.BOOLEAN
        },
        materialMasterId: {
            type: Sequelize.UUID
        },
        materialMasterName: {
            type: Sequelize.STRING
        },
        materialId: {
            type: Sequelize.UUID
        },
        materialName: {
            type: Sequelize.STRING
        },
        currencyId: {
            type: Sequelize.UUID
        },
        deleted: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        createdBy: {
            type: Sequelize.UUID
        },
        createdAt: {
            type: Sequelize.DATE
        },
        updatedBy: {
            type: Sequelize.UUID
        },
        updatedAt: {
            type: Sequelize.DATE
        }
    };
}