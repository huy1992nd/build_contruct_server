const Sequelize = require("sequelize");
const StatusEnum = require('../enums/Status');
const errorDef = require('../../../../utils/error.codes');

module.exports = () => {
    return {
        id: {
            // type: Sequelize.UUID,
            // primaryKey: true,
            // defaultValue: Sequelize.UUIDV1
            type: Sequelize.STRING,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        orderSetupDateFrom: {
            type: Sequelize.DATEONLY,
            allowNull: false
        },
        orderSetupDateTo: {
            type: Sequelize.DATEONLY,
            allowNull: false
        },
        orderCreateDateFrom: {
            type: Sequelize.DATEONLY,
            allowNull: false
        },
        orderCreateDateTo: {
            type: Sequelize.DATEONLY,
            allowNull: false
        },
        month: {
            type: Sequelize.DATEONLY,
            allowNull: false
        },
        companyId: {
            type: Sequelize.STRING,
            allowNull: false
        },
        ratioSetting: {
            type: Sequelize.DECIMAL(10,2),
            // allowNull: false
            defaultValue: 0
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