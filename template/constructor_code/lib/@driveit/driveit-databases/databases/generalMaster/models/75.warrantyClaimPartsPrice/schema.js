/*jshint esversion: 9 */

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
        makeId: {
            type: Sequelize.UUID,
            allowNull: false,
        },
        makeCodeName: {
            type: Sequelize.STRING,
            allowNull: true
        },
        price: {
            type: Sequelize.DECIMAL(13,2),
            allowNull: false
        },
        validFrom:{
            type: Sequelize.DATE,
            allowNull: false
        },
        validTo:{
            type: Sequelize.DATE,
            allowNull: false
        },
        deleted: {
            type: Sequelize.BOOLEAN,
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
        countryId: {
            type: Sequelize.UUID,
            allowNull: false,
            references: { model: 'country', key: 'id' },
        },
        currencyId: {
            type: Sequelize.UUID,
            allowNull: false,
            references: { model: 'currency', key: 'id' },
        },
        uomId: {
            type: Sequelize.UUID,
            allowNull: false,
            references: { model: 'uom', key: 'id' },
        },
        partNumberValue: {
            type: Sequelize.STRING,
            allowNull: false
        }
    };
};