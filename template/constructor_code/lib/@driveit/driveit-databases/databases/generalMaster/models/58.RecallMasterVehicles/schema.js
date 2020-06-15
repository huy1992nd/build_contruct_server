/*jshint esversion: 9 */
const Sequelize = require("sequelize");
const StatusEnum = require('../enums/recallStatus');
const errorDef = require('../../../../utils/error.codes');


module.exports = () => {
    return {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV1
        },
        chassisNo: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        roNo: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        regNo: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        roDate: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        branchId: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        status: {
            type: Sequelize.ENUM,
            allowNull: false,
            defaultValue: StatusEnum.New,
            values: [StatusEnum.recallVehicleStatuses]
        },
        inactivateReason: {
            type: Sequelize.STRING,
            allowNull: true
        },
        deleted: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false,
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
};