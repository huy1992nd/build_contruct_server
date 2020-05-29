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
        itemCategory: {
            type: Sequelize.STRING,
            allowNull: false,
        },

        // jobs details
        jobId: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        jobsCode: {
            type: Sequelize.STRING,
            allowNull: true
        },
        jobDesc: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        jobClassId: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        jobClassName: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        // parts details
        partCode: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        partDesc: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        partsUoMId: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        quantity: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        status: {
            type: Sequelize.ENUM,
            allowNull: true,
            defaultValue: StatusEnum.ENABLED,
            values: [StatusEnum.status],
        },
        inactivateReason: {
            type: Sequelize.STRING,
            allowNull: true
        },
        deleted: {
            type: Sequelize.BOOLEAN,
            allowNull: true,
            defaultValue: false,
        },
        createdBy: {
            type: Sequelize.STRING,
            allowNull: false
        },
        updatedBy: {
            type: Sequelize.STRING,
            allowNull: false
        },
        partsUoM: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        materialMasterId: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        materialId: {
            type: Sequelize.STRING,
            allowNull: true,
        }
    };
};