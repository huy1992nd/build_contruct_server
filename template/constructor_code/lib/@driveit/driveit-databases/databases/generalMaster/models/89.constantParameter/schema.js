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

        module:{
            type: Sequelize.STRING(20),
            allowNull: true,
        },
        functionArea:{
            type: Sequelize.STRING(40),
            allowNull: true,
        },
        parameter1:{
            type: Sequelize.STRING(20),
            allowNull: true,
        },
        parameter2:{
            type: Sequelize.STRING(20),
            allowNull: true,
        },
        parameter3:{
            type: Sequelize.STRING(20),
            allowNull: true,
        },
        parameter4:{
            type: Sequelize.STRING(20),
            allowNull: true,
        },
        parameter5:{
            type: Sequelize.STRING(20),
            allowNull: true,
        },

        value1:{
            type: Sequelize.STRING(50),
            allowNull: true,
        },
        value2:{
            type: Sequelize.STRING(50),
            allowNull: true,
        },
        value3:{
            type: Sequelize.STRING(50),
            allowNull: true,
        },
        value4:{
            type: Sequelize.STRING(50),
            allowNull: true,
        },
        value5:{
            type: Sequelize.STRING(50),
            allowNull: true,
        },

        remark:{
            type: Sequelize.STRING(255),
            allowNull: true,
        },
        
        status:{
            type: Sequelize.ENUM("Active", "Inactive"),
            allowNull: false,
            field: 'status',
            defaultValue: 'Active'
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
            allowNull: false
        },
        updatedAt: {
            type: Sequelize.DATE,
            allowNull: false
        }
    };
}