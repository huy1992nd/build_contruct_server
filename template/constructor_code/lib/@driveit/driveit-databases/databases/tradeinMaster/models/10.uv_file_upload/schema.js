const Sequelize = require("sequelize");
const StatusEnum = require('../enums/Status');

module.exports = () => {
    return {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV1
        },
        fileName: {
            type: Sequelize.STRING,
            allowNull: false,
            // unique: true, // to allow update based on status 'deleted'
        },
        path: {
            type: Sequelize.STRING,
        },
        fileUploadConfigId: {
            type: Sequelize.STRING,
        },
        fileUploadConfigCode: {
            type: Sequelize.STRING,
        },
        createdBy: {
            type: Sequelize.STRING,
            allowNull: false
        },
        updatedBy: {
            type: Sequelize.STRING,
            allowNull: false
        },
        deleted: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        isDocument: {
            type: Sequelize.TINYINT,
            defaultValue: 0
        }
    };
}