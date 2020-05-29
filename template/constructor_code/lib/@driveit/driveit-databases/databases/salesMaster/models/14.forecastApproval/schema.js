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
        name:{
            type: Sequelize.STRING,
            // allowNull:false
        },
        parentId:{
            type: Sequelize.UUID,
            // allowNull:false
        },
        childId:{
            type: Sequelize.UUID,
            allowNull:false
        },
        viewType: {
            type: Sequelize.ENUM,
            allowNull: false,
            defaultValue: StatusEnum.FORECASTVIEWTYPE.COMPANY,
            values: [StatusEnum.forecastViewType],
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
        status: {
            type: Sequelize.ENUM,
            allowNull: false,
            defaultValue: StatusEnum.FORECASTSTATUS.PENDING,
            values: [StatusEnum.forecastStatus],
        },
        rejectedReason: {
            type: Sequelize.STRING,
            // allowNull: false
        },
        rejectedBy: {
            type: Sequelize.STRING,
            // allowNull: false
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