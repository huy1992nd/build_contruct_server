const Sequelize = require("sequelize");
const StatusEnum = require('../enums/Status');
const errorDef = require('../../../../utils/error.codes');

module.exports = () => {
    return {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV1
        },
        companyId:{
            type: Sequelize.UUID,
            // allowNull:false
        },
        branchId:{
            type: Sequelize.UUID,
            // allowNull:false
        },
        color:{
            type: Sequelize.STRING,
            // allowNull:false
        },
        variant:{
            type: Sequelize.STRING,
            // allowNull:false
        },
        model:{
            type: Sequelize.STRING,
            // allowNull:false
        },
        product:{
            type: Sequelize.STRING,
            // allowNull:false
        },
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
        }
    };
}