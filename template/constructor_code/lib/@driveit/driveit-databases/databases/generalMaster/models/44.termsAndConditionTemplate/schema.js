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
        termsAndConditions: {
            type: Sequelize.STRING,
            allowNull: false
        },
        locale: {
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