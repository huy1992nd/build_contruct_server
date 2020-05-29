const Sequelize = require("sequelize");
const StatusEnum = require('../enums/Status');
const errorDef = require('../../../../utils/error.codes');

module.exports = () => {
    return {
        id: {
            type: Sequelize.UUID, // create from topic series
            primaryKey: true,
            defaultValue: Sequelize.UUIDV1
        },
        lastMileage: {
            type: Sequelize.INTEGER
        },
        prevMileage: {
            type: Sequelize.INTEGER
        },
        lastEngineHour: {
            type: Sequelize.INTEGER
        },
        prevEngineHour: {
            type: Sequelize.INTEGER
        },
        oldLastMileage: {
            type: Sequelize.INTEGER
        },
        oldPrevMileage: {
            type: Sequelize.INTEGER
        },
        oldLastEngineHour: {
            type: Sequelize.INTEGER
        },
        oldPrevEngineHour: {
            type: Sequelize.INTEGER
        },
        prevAccuMileage: { // Previous Accumulated Mileage (km)
            type: Sequelize.INTEGER
        },
        prevAccuEngineHour: { // Previous Accumulated Engine Hours (hr)
            type: Sequelize.INTEGER
        },
        status: {
            type: Sequelize.ENUM,
            allowNull: false,
            defaultValue: StatusEnum.ENABLED,
            values: [StatusEnum.status],
        },
        deleted: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false,
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
        vehicleId: {
            type: Sequelize.UUID,
            references: {
                model: "vehicle", 
                key: "id", 
            }
        },
    };
}