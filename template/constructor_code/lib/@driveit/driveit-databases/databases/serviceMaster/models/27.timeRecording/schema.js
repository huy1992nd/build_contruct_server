const Sequelize = require("sequelize");
const StatusEnum = require('../enums/Status');

module.exports = () => {
    return {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV1
        },
        internalUserId: {
            type: Sequelize.STRING,
            allowNull: true
        },
       /*  repairOrderId: {
            type: Sequelize.STRING,
            allowNull: false
        },
        repairOrderFlatRateId: {
            type: Sequelize.STRING,
            allowNull: false
        },
        timeRecordingEventTypeId: {
            type: Sequelize.STRING,
            allowNull: false
        }, */
        dateTimeStamp: {
            type: Sequelize.DATE,
            allowNull: true
        },
        employeeId: {
            type: Sequelize.STRING,
            allowNull: true
        },
        companyId: {
            type: Sequelize.STRING,
            allowNull: true
        },
        branchId: {
            type: Sequelize.STRING,
            allowNull: true
        },
        status: {
            type: Sequelize.ENUM,
            allowNull: true,
            defaultValue: StatusEnum.ENABLED,
            values: [StatusEnum.status],
        },
        remark: {
            type: Sequelize.STRING,
            allowNull: true
        },
        deleted: {
            type: Sequelize.BOOLEAN,
            allowNull: true,
            defaultValue: false,
        },
        inactivateReason: {
            type: Sequelize.STRING,
            // allowNull: false
        },
        createdBy: {
            type: Sequelize.STRING,
            allowNull: true
        },
        updatedBy: {
            type: Sequelize.STRING,
            allowNull: true
        }
    };
}