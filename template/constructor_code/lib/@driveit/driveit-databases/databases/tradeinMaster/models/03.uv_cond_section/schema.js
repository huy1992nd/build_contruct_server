const Sequelize = require("sequelize");
const StatusEnum = require('../enums/Status');

module.exports = () => {
    return {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV1
        },
        code: {
            type: Sequelize.STRING,
            allowNull: false,
            // unique: true, // to allow update based on status 'deleted'
        },
        name: {
            type: Sequelize.STRING
        },
        isImportant: {
            type: Sequelize.TINYINT,
            allowNull: false,
            defaultValue: 0
        },
        isMajorIncident: {
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
        seqNo: {
            type: Sequelize.TINYINT,
            allowNull: false,
            // unique: true,
        },
        weight: {
            type: Sequelize.SMALLINT
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