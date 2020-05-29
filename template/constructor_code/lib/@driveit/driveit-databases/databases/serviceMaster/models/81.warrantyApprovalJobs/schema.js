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
        jobClassId: {
            type: Sequelize.UUID
        },
        jobTypeId: {
            type: Sequelize.UUID
        },
        servicePackageId: {
            type: Sequelize.UUID
        },
        billTo: {
            type: Sequelize.UUID
        },
        billToName: {
            type: Sequelize.STRING
        },
        chargeType: {
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
        hours: {
            type: Sequelize.DECIMAL(15, 2)
        },
        status: {
            type: Sequelize.STRING
        },
        subletCodeId: {
            type: Sequelize.UUID
        },
        subletCodeName: {
            type: Sequelize.STRING
        },
        bayMasterId: {
            type: Sequelize.UUID
        },
        resolvedStatus: {
            type: Sequelize.BOOLEAN
        },
        reassignedTechnicianId: {
            type: Sequelize.UUID
        },
        reassignedTechnicianName: {
            type: Sequelize.STRING
        },
        workDate: {
            type: Sequelize.DATEONLY
        },
        startTime: {
            type: Sequelize.TIME
        },
        endTime: {
            type: Sequelize.TIME
        },
        remark: {
            type: Sequelize.STRING
        },
        isSplit: {
            type: Sequelize.BOOLEAN
        },
        inactivateReason: {
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