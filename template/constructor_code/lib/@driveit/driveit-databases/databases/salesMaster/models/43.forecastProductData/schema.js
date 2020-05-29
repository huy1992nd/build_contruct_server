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
        product:{
            type: Sequelize.STRING,
            // allowNull:false
        },
        productId:{
            type: Sequelize.UUID,
            // allowNull:false
        },
        month:{
            type:Sequelize.DATEONLY,
            allowNull:false
        },
        dataN0:{
            type: Sequelize.INTEGER,
            defaultValue: 0,
            allowNull:false
        },
        dataN1:{
            type: Sequelize.INTEGER,
            defaultValue: 0,
            allowNull:false
        },
        dataN2:{
            type: Sequelize.INTEGER,
            defaultValue: 0,
            allowNull:false
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