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
        technicianId: {
            type: Sequelize.CHAR(36),
            // allowNull: false,
            // references: {
            //     model: 'internal_users',
            //     key: 'id'
            // }
        },
        timeRecordingTerminalId: {
            type: Sequelize.CHAR(36),
            // allowNull: false,
            // references: {
            //     model: 'timeRecordingTerminal',
            //     key: 'id'
            // }
        },
        timeRecordingEventTypeId: {
            type: Sequelize.CHAR(36),
            // allowNull: false,
            // references: {
            //     model: 'timeRecordingEventType',
            //     key: 'id'
            // }
        },
        timeRecordingEventTypeName: {
            type: Sequelize.STRING,
            allowNull: true
        },
        repairOrderId: {
            type: Sequelize.CHAR(36),
            // allowNull: false,
            // references: {
            //     model: 'repairOrder',
            //     key: 'id'
            // }
        },
        repairOrderFlatRateId: {
            type: Sequelize.CHAR(36),
            // allowNull: false,
            // references: {
            //     model: 'repairOrderFlatRate',
            //     key: 'id'
            // }
        },
        remark: {
            type: Sequelize.STRING,
            allowNull: true
        },
        workDate: {
            type: Sequelize.DATEONLY,
            allowNull: true
        },
        endDate: {
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
    };
}