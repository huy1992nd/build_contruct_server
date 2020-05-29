const Sequelize = require("sequelize");
const StatusEnum = require('../enums/Status');

module.exports = () => {
    return {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV1
        },
        echeckListId: {
            type: Sequelize.UUID,
            allowNull: false,
            // unique: true, // to allow update based on status 'deleted'
        },
        inspectionId: {
            type: Sequelize.UUID,
            allowNull: false,
        },
        condListId: {
            type: Sequelize.UUID,
            allowNull: false,
        },
        condReasonId: {
            type: Sequelize.UUID,
            allowNull: false,
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