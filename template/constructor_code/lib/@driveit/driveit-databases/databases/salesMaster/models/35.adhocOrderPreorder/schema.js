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
        model:{
            type:Sequelize.STRING,
            // allowNull:false
        },
        variant:{
            type:Sequelize.STRING,
            // allowNull:false
        },
        product:{
            type:Sequelize.STRING,
            // allowNull:false
        },
        color:{
            type:Sequelize.STRING,
            // allowNull:false
        },
        exciseType:{
            type:Sequelize.STRING,
            // allowNull:false
        },
        standardPackage:{
            type:Sequelize.STRING,
            // allowNull:false
        },
        optionalPackage:{
            type:Sequelize.STRING,
            // allowNull:false
        },
        vehicleId:{
            type:Sequelize.STRING,
            // allowNull:false
        },
        chassisNo:{
            type:Sequelize.STRING,
            // allowNull:false
        },
        EngineNo:{
            type:Sequelize.STRING,
            // allowNull:false
        },
        orderQuantity:{
            type:Sequelize.STRING,
            // allowNull:false
        },
        status: {
            type: Sequelize.ENUM,
            allowNull: false,
            defaultValue: StatusEnum.FORECASTSTATUS.NEW,
            values: [StatusEnum.forecastStatus],
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