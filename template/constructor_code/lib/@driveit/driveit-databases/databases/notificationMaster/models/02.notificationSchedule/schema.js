const Sequelize = require("sequelize");
const StatusEnum = require('../enums/Status');

module.exports = () => {
    return {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV1
        },
        status: {
            type: Sequelize.ENUM,
            allowNull: true,
            values: [StatusEnum.status],
        },
        smsNumber: {
            type: Sequelize.STRING,
            allowNull: true
        },
        smsMessage: {
            type: Sequelize.STRING,
            allowNull: true
        },
        scheduleDateTime: {
            type: Sequelize.DATE,
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