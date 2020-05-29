const Sequelize = require("sequelize");
const errorDef = require('../../../../utils/error.codes');

module.exports = () => {
    return {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV1
        },
        invoiceNumber: {
            type: Sequelize.STRING
        },
        date: {
            type: Sequelize.DATE,
            allowNull: false
        },
        currencyId: {
            type: Sequelize.STRING
        },
        outstandingAmount: {
            type: Sequelize.STRING,
            allowNull: true
        },
        appliedAmount: {
            type: Sequelize.STRING,
            allowNull: true
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