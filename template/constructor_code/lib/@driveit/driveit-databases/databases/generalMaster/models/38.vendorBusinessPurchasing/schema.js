const Sequelize = require("sequelize");
const StatusEnum = require('../enums/Status');
const errorDef = require('../../../../utils/error.codes');

module.exports = () => {
    return {
        vendorId: {
            type: Sequelize.STRING,
            //primaryKey: true,
            allowNull: false
            //defaultValue: Sequelize.UUIDV1
        },
        company: {
            type: Sequelize.STRING,
            allowNull: false
        },
        branch: {
            type: Sequelize.STRING,
            allowNull: false
        },
        paymentTerms: {
            type: Sequelize.STRING,
            allowNull: false
        },
        poCurrency: {
            type: Sequelize.STRING,
            allowNull: false
        },
        purchasingBlock: {
            type: Sequelize.BOOLEAN,
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