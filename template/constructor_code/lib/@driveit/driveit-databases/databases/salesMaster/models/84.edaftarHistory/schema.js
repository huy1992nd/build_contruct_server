const Sequelize = require("sequelize");
const StatusEnum = require('../enums/Status');

module.exports = () => {
    return {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV1
        },
        chassisNo: {
            type: Sequelize.STRING,
            allowNull: true
        },

        bookingNo: {
            type: Sequelize.STRING,
            allowNull: true
        },
    
        action: {
            type: Sequelize.ENUM,
            allowNull: false,
            defaultValue: StatusEnum.ACTION.NA,
            values: [StatusEnum.actionMode],
        },

        submissionDate: {
            type: Sequelize.DATE,
        },
        sentDate: {
            type: Sequelize.DATE,
        },
        status: {
            type: Sequelize.ENUM,
            allowNull: false,
            defaultValue: 'pending',
            values: ['pending', 'cancelled', 'fail', 'new', 'success'],
        },

        // default for fields
        deleted: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        createdBy: {
            type: Sequelize.STRING,
            allowNull: false
        },
        updatedBy: {
            type: Sequelize.STRING,
            allowNull: false
        },
        createdAt: {
            type: Sequelize.DATE,
            allowNull: false
            // defaultValue: Sequelize.NOW
        },
        updatedAt: {
            type: Sequelize.DATE,
            allowNull: false
        }
    };
}