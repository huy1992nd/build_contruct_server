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
        orNo: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        orDate: {
            type: Sequelize.DATEONLY,
            allowNull: true,
        },
        amount: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        dnNo: {
            type: Sequelize.DATEONLY,
            allowNull: true,
        },
        dnDate: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        billingDocument: {
            type: Sequelize.STRING,
            allowNull: true,
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