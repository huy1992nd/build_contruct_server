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
        countryId:{
            type: Sequelize.STRING,
            allowNull: true,
        },
        companyId:{
            type: Sequelize.STRING,
            allowNull: true,
        },
        docType:{
            type:Sequelize.STRING,
            allowNull: true,
        },
        docKey:{
            type:Sequelize.STRING(2),
            allowNull: true,
        },
        startNumber:{
            type:Sequelize.INTEGER(7),
            allowNull: false,
        },
        yearSuffix:{
            type: Sequelize.STRING(1),
            allowNull: true
        },
        resetPerYr:{
            type: Sequelize.STRING(1),
            allowNull: true
        },
        docLastNum:{
            type: Sequelize.INTEGER(21),
            allowNull: true
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