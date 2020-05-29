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
        
        // status: {
        //     type: Sequelize.ENUM,
        //     allowNull: false,
        //     defaultValue: StatusEnum.ENABLED,
        //     values: [StatusEnum.status]
        // },

        insurerName: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        coveragePeriodFrom: {
            type: Sequelize.DATE,
            allowNull: true,
        },
        coveragePeriodTo: {
            type: Sequelize.DATE,
            allowNull: true,
        },
        coverNoteNo: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        insurerdAmount: {
            type: Sequelize.FLOAT,
            allowNull: true,
        },
        premiumAmount: {
            type: Sequelize.FLOAT,
            allowNull: true,
        },
        bookingId: {
            type: Sequelize.STRING,
            allowNull: true,
        },
    };
}