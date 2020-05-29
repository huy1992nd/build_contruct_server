const Sequelize = require("sequelize");
const StatusEnum = require('../enums/Status');
const errorDef = require('../../../../utils/error.codes');

module.exports = () => {
    return {
        region: {
            type: Sequelize.STRING,
            // allowNull: false,
            //primaryKey: true,
            //defaultValue: Sequelize.UUIDV1
        },
        customerGroup: {
            type: Sequelize.STRING,
            //allowNull:false
        },
        eligibleDateCriteria: {
            type: Sequelize.STRING,
            allowNull: true
            //allowNull:false
        },
        modelNames: {
            type: Sequelize.STRING
        },
        startDate: {
            type: Sequelize.STRING,
            allowNull: true
            //allowNull:false
        },
        endDate: {
            type: Sequelize.STRING,
            allowNull: true
            //allowNull: false
        },
        yearMakeFrom: {
            type: Sequelize.STRING,
            //allowNull: false
        },
        yearMakeTo: {
            type: Sequelize.STRING,
            //allowNull: false
        },
        model: {
            type: Sequelize.STRING,
            //allowNull: false
        },
        modelVarient: {
            type: Sequelize.STRING
        },
        product: {
            type: Sequelize.STRING
        },
        serviceModel: {
            type: Sequelize.STRING
        },
        createdBy: {
            type: Sequelize.STRING,
            allowNull: false
        },
        updatedBy: {
            type: Sequelize.STRING,
            allowNull: false
        },
        deleted: {
            type: Sequelize.BOOLEAN
        }

    }
}