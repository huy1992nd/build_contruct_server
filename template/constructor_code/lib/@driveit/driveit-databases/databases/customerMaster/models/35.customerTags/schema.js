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
        customerTagId: {
            type: Sequelize.STRING,
            // allowNull: false
        },
        dateFrom: {
            type: Sequelize.DATEONLY,
            // allowNull: false
        },
        dateTo: {
            type: Sequelize.DATEONLY,
            // allowNull: false
        },
        /** ******************************** Standard Fields */
        status: {
            type: Sequelize.ENUM,
            allowNull: false,
            defaultValue: StatusEnum.ENABLED,
            values: [StatusEnum.status],
        },
        deleted: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        inactivateReason: {
            type: Sequelize.STRING,
            // allowNull: false
        },
        createdBy: {
            type: Sequelize.STRING,
            allowNull: false
        },
        updatedBy: {
            type: Sequelize.STRING,
            allowNull: false
        },
        customerDetailsId: {
            type: Sequelize.UUID,
            references: {
                model: "customerDetails",
                key: "id",
            }
        }
    };
}