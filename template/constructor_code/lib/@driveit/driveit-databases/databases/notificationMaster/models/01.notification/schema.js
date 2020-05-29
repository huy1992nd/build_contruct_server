const Sequelize = require("sequelize");
const StatusEnum = require('../enums/Status');

module.exports = () => {
    return {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV1
        },
        notificationType: {
            type: Sequelize.ENUM,
            allowNull: false,
            values: [StatusEnum.notificationTypes]
        },
        status: {
            type: Sequelize.ENUM,
            allowNull: false,
            values: [StatusEnum.status],
        },
        emailAddress: {
            type: Sequelize.STRING,
            allowNull: true
        },
        emailSubject: {
            type: Sequelize.STRING,
            allowNull: true
        },
        emailContent: {
            type: Sequelize.STRING,
            allowNull: true
        },
        smsNumber: {
            type: Sequelize.STRING,
            allowNull: true
        },
        smsMessage: {
            type: Sequelize.STRING,
            allowNull: true
        },
        pushMessage: {
            type: Sequelize.STRING,
            allowNull: false
        },
        scheduleDate: {
            type: Sequelize.DATEONLY,
            allowNull: true
        },
        scheduleStartTime: {
            type: Sequelize.TIME,
            allowNull: true
        },
        scheduleEndTime: {
            type: Sequelize.TIME,
            allowNull: true
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