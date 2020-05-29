const Sequelize = require("sequelize");
const StatusEnum = require('../enums/Status');
const errorDef = require('../../../../utils/error.codes');
/* amount: "asd"
billTo: "4aaefef0-9d39-11e9-a805-353a6c7bbabf"
chargeType: "4aaefef0-9d39-11e9-a805-353a6c7bbabf"
chargeTypeName: (2) [undefined, "Internal "]
discountAmount: "asd"
discountPercent: "asd"
hours: "wer"
jobClass: "0b06f7d0-9d3e-11e9-a805-353a6c7bbabf"
jobClassName: (5) [undefined, "Periodical Maintenance", undefined, undefined, undefined]
taxAmount: "asd"
total: "asd"
type: "flatRate" */
module.exports = () => {
    return {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV1
        },
        billTo: {
            type: Sequelize.STRING,
            allowNull: true
        },
        hours: {
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
        unitAmount: {
            type: Sequelize.STRING,
            allowNull: true
        },
        amount: {
            type: Sequelize.STRING,
            allowNull: true
        },
        billToName: {
            type: Sequelize.STRING,
             allowNull: true
        },
        totalAmount: {
            type: Sequelize.DECIMAL(15, 6),
            allowNull: true
        },
        reassignedTechnicianId: {
            type: Sequelize.UUID,
            allowNull: true
        },
        vendorId: {
            type: Sequelize.STRING,
            allowNull: true
        },
        reassignedTechnicianName: {
            type: Sequelize.STRING,
            allowNull: true
        },
        workDate: {
            type: Sequelize.DATEONLY,
            allowNull: true
        },
        startTime: {
            type: Sequelize.TIME,
            allowNull: true
        },
        endTime: {
            type: Sequelize.TIME,
            allowNull: true
        },
        chargeType: {
            type: Sequelize.STRING
        },
        resolvedStatus: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        remark: {
            type: Sequelize.STRING,
            allowNull: true
        },
        warrantyIncidentId: {
            type: Sequelize.STRING
        },
        isSplit: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        },
        assignmentDate: {
            type: Sequelize.DATEONLY,
            allowNull: true,
        },
        status: {
            type: Sequelize.ENUM,
            allowNull: false,
            defaultValue: StatusEnum.NEW,
            values: [StatusEnum.jobStatus],
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
        },
        recommendation: {
            type: Sequelize.BOOLEAN,
            allowNull: true,
            defaultValue: false,
        },
        costCenterId: {
            type: Sequelize.STRING,
            allowNull: true
        },
        costCenterName: {
            type: Sequelize.STRING,
            allowNull: true
        },
        subletCodeId: {
            type: Sequelize.UUID
        },
        subletCodeName: {
            type: Sequelize.STRING
        },
    };
}