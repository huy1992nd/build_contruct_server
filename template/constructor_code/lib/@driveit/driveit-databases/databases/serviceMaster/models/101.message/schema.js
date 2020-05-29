const Sequelize = require("sequelize");

module.exports = () => {
    return {
        id: {
            type: Sequelize.CHAR(36),
            primaryKey: true,
            defaultValue: Sequelize.UUIDV1
        },
        subject: {
            type: Sequelize.CHAR(100),
            allowNull: true
        },
        creatorId: {
            type: Sequelize.CHAR(36),
            allowNull: true
        },
        messageBody: {
            type: Sequelize.STRING,
            allowNull: true
        },
        recipientId: {
            type: Sequelize.CHAR(36)
        },
        recipientPhone: {
            type: Sequelize.CHAR(15),
            allowNull: true
        },
        recipientEmail: {
            type: Sequelize.CHAR(100),
            allowNull: true
        },
        registrationNo: {
            type: Sequelize.STRING,
            allowNull: true
        },
        nextRecommendedDate: {
            type: Sequelize.DATE
        },
        isReminder: {
            type: Sequelize.BOOLEAN,
            allowNull: true
        },
        deleted: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        createdBy: {
            type: Sequelize.CHAR(36)
        },
        createdAt: {
            type: Sequelize.DATE
        },
        updatedBy: {
            type: Sequelize.CHAR(36)
        },
        updatedAt: {
            type: Sequelize.DATE
        }
    };
}