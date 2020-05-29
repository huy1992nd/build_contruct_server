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
            type:Sequelize.STRING,
            allowNull:false
        },
        dateFrom:{
            type:Sequelize.DATEONLY,
            allowNull:false
        },
        dateTo:{
            type:Sequelize.DATEONLY,
            allowNull:false
        },
        month:{
            type:Sequelize.DATEONLY,
            allowNull:false
        },
        companyId:{
            type:Sequelize.STRING,
            allowNull:false
        },
        dealerIds:{
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