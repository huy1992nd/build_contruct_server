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
            type: Sequelize.DATE,
            allowNull: true,
        },
        preRepairOrderId: {
            type: Sequelize.UUID,
            references: {
                model: 'PreRepairOrder',
                key: 'id'
            },
        },
        bayMasterId: {
            type: Sequelize.UUID,
            references: {
                model: 'bayMaster',
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
        jobClassId: {
            type: Sequelize.UUID,
            references: {
                model: 'jobClass',
                key: 'id'
            },
        },
        jobTypeId: {
            type: Sequelize.UUID,
            references: {
                model: 'jobType',
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
        }
    };
}