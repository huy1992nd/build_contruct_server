const Sequelize = require("sequelize");
const StatusEnum = require('../enums/Status');
const errorDef = require('../../../../utils/error.codes');

module.exports = () => {
    return {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV1
            // type: Sequelize.STRING,
            // primaryKey: true
        },
        registarationId: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        // dealerRebatesId: {
        //     type: Sequelize.UUID,
        //     references:{
        //         model:"DealerRebates",
        //         key:"id"
        //     }
        // },
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