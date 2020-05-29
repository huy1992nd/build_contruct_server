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
            type: Sequelize.STRING,
        },
        groupName: {
            type: Sequelize.STRING,
        },
        seqNo: {
            type: Sequelize.TINYINT,
        },
        deleted: {
            type: Sequelize.TINYINT,
            allowNull: false
        },
        required: {
            type: Sequelize.TINYINT,
            allowNull: false
        },
        isShowLabelCompare: {
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