const Sequelize = require("sequelize");
const StatusEnum = require('../enums/Status');

module.exports = () => {
    return {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV1
        },
        condId: {
            type: Sequelize.UUID,
            allowNull: false,
            // unique: true, // to allow update based on status 'deleted'
        },
        condSecId: {
            type: Sequelize.UUID,
            allowNull: false,
            // unique: true, // to allow update based on status 'deleted'
        },
        reason: {
            type: Sequelize.STRING,
            allowNull: false,
            // unique: true,
        },
        rating: {
            type: Sequelize.TINYINT,
            allowNull: false,
            defaultValue: 0
        },
        deleted: {
            type: Sequelize.TINYINT,
            allowNull: false
        },
        inactivateReason: {
            type: Sequelize.STRING,
        },
        status: {
            type: Sequelize.ENUM,
            allowNull: false,
            defaultValue: StatusEnum.ENABLED,
            values: [StatusEnum.status],
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