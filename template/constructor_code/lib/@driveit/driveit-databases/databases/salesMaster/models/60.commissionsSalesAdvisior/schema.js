const Sequelize = require("sequelize");
const BookingStatusEnum = require('../enums/BookingStatus');
const AflStatusEnum = require('../enums/AflStatus');
const errorDef = require('../../../../utils/error.codes');
module.exports = () => {
    return {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV1
        },
        materialCode: {
            type: Sequelize.STRING,
            allowNull: true
        },
        autoSacrifice: {
            type: Sequelize.BOOLEAN,
            allowNull: true,
        },
        packageId: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        packageName: {
            type: Sequelize.STRING,
            allowNull: true
        },
        type: {
            type: Sequelize.STRING,
            allowNull: true
        },
        value: {
            type: Sequelize.STRING,
            allowNull: true
        },
        createdBy: {
            type: Sequelize.STRING,
            allowNull: true
        },
        updatedBy: {
            type: Sequelize.STRING,
            allowNull: true
        }
    };
}