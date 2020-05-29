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
        month:{
            type:Sequelize.DATEONLY,
            allowNull:false
        },
        dataModel:{
            type: Sequelize.INTEGER,
            defaultValue: 0,
            allowNull:false
        },
        dataVariant:{
            type: Sequelize.INTEGER,
            defaultValue: 0,
            allowNull:false
        },
        dataProduct:{
            type: Sequelize.INTEGER,
            defaultValue: 0,
            allowNull:false
        },
        dataColor:{
            type: Sequelize.INTEGER,
            defaultValue: 0,
            allowNull:false
        },
        // type: {
        //     type: Sequelize.ENUM,
        //     allowNull: false,
        //     values: [StatusEnum.forecastDataType],
        // },
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