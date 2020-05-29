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
        order:{
            type: Sequelize.INTEGER,
            defaultValue: 0,
            allowNull:false
        },
        previousMonth:{
            type: Sequelize.INTEGER,
            defaultValue: 0,
            allowNull:false
        },
        outstandingBooking:{
            type: Sequelize.INTEGER,
            defaultValue: 0,
            allowNull:false
        },
        stock:{
            type: Sequelize.INTEGER,
            defaultValue: 0,
            allowNull:false
        },
        forecast:{
            type: Sequelize.INTEGER,
            defaultValue: 0,
            allowNull:false
        },
        target:{
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