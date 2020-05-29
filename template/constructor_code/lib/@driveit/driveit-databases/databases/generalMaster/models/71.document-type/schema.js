const Sequelize = require("sequelize");
const StatusEnum = require('../enums/Status');
// const errorDef = require('../../../services/services.config/errorDef');
module.exports = () => {
    return {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV1
        },
        code:{
            type: Sequelize.STRING,
            allowNull: true,
        },
        name:{
            type: Sequelize.STRING,
            allowNull: true,
        },
        status:{
            type: Sequelize.ENUM("enabled", "disabled", "pending"),
            allowNull: false,
            field: 'status',
            defaultValue: 'enabled'
        },
        inactiveReason:{
            type: Sequelize.STRING,
            allowNull: true
        },
        deleted: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        createdBy: {
            type: Sequelize.STRING,
            allowNull: false
        },
        updatedBy: {
            type: Sequelize.STRING,
            allowNull: true
        },
        createdAt: {
            type: Sequelize.DATE,
            allowNull: true,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            field: 'createdAt'
        },
        updateAt: {
            type: Sequelize.DATE,
            allowNull: true,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            field: 'updateAt'
        }
    };
}