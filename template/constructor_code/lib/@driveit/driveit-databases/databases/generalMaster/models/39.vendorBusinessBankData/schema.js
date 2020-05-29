const Sequelize = require("sequelize");
const StatusEnum = require('../enums/Status');
const errorDef = require('../../../../utils/error.codes');

module.exports = () => {
    return {
        vendorId: {
            type: Sequelize.STRING,
            allowNull: false
            //primaryKey: true,
            //defaultValue: Sequelize.UUIDV1
        },
        country: {
            type: Sequelize.STRING,
            allowNull: false
        },
        bankName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        accountNumber: {
            type: Sequelize.STRING,
            allowNull: false
        },
        branch: {
            type: Sequelize.STRING,
            allowNull: false
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