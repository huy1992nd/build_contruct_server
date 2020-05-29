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

        orNo: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        orDate: {
            type: Sequelize.DATE,
            allowNull: true,
        },
        amount: {
            type: Sequelize.FLOAT,
            allowNull: true,
        },
        dnNo: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        dnDate: {
            type: Sequelize.FLOAT,
            allowNull: true,
        },
        deleted: {
            type: Sequelize.BOOLEAN,
            allowNull: true,
            defaultValue: false
        },
        bookingNo: {
            type: Sequelize.STRING,
            // allowNull: true,
        },
    };
}