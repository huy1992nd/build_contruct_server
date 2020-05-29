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
        currencyId: {
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
        warrantyIncidentId: {
            type: Sequelize.UUID,
            allowNull: true,
            defaultValue: '00000000-0000-0000-0000-000000000000'
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