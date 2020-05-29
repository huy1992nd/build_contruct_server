const Sequelize = require("sequelize");
const StatusEnum = require('../enums/Status');
const errorDef = require('../../../../utils/error.codes');

module.exports = () => {
    return {
        startDate: {
            type: Sequelize.STRING,
            // allowNull: false,
            //primaryKey: true,
            //defaultValue: Sequelize.UUIDV1
        },
        expiaryDate: {
            type: Sequelize.STRING,
            //allowNull:false
        },
        validityPeriod: {
            type: Sequelize.STRING,
            allowNull: true
            //allowNull:false
        },
        minSpendingAmount: {
            type: Sequelize.STRING,

        },
        maxSpendingAmount: {
            type: Sequelize.STRING,

        },
        minMilage: {
            type: Sequelize.STRING,

        },
        maxMilage: {
            type: Sequelize.STRING,

        },
        updatedBy: {
            type: Sequelize.STRING,
            allowNull: false
        },
        createdBy: {
            type: Sequelize.STRING,
            allowNull: false
        },

        deleted: {
            type: Sequelize.BOOLEAN
        }

    }
}