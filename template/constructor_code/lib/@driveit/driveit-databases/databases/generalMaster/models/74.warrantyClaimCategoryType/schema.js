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
        },
        warrantyClaimTypeId: {
            type: Sequelize.STRING,
            allowNull: false
        },
        warrantyCategoryId: {
            type: Sequelize.UUID,
            allowNull: false,
            references: { model: 'warrantyCategory', key: 'id' },
        },
    };
}