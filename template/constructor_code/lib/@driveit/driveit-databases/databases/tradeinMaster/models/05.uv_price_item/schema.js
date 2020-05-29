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
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            // unique: true,
        },
        prcChannelId: {
            type: Sequelize.UUID,
        },
        prcChannelCode: {
            type: Sequelize.STRING,
        },
        inputType: {
            type: Sequelize.STRING,
        },
        validatePattern: {
            type: Sequelize.STRING,
        },
        maxLength: {
            type: Sequelize.STRING,
        },
        isUploadImg: {
            type: Sequelize.TINYINT,
        },
        isReadOnly: {
            type: Sequelize.TINYINT,
        },
        isRequired: {
            type: Sequelize.TINYINT,
        },
        formatText :{
            type: Sequelize.STRING,
        },
        deleted: {
            type: Sequelize.TINYINT,
            allowNull: false
        },
        status: {
            type: Sequelize.ENUM,
            allowNull: false,
            defaultValue: StatusEnum.ENABLED,
            values: [StatusEnum.status],
        },
        inactivateReason: {
            type: Sequelize.STRING,
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