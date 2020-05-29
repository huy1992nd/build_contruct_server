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
        countryId: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        companyId: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        branchId: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        leadDateTime: {
            type: Sequelize.DATE,
            allowNull: true
        },
        overBooking: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        leadTime: {
            type: Sequelize.STRING,
            allowNull: true
        },
        leadTimeValue: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        walkInAllocationForSAHour: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        walkInAllocationForTechnicianHour: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        monday: {
            type: Sequelize.TEXT,
        },
        tuesday: {
            type: Sequelize.TEXT,
        },
        wednesday: {
            type: Sequelize.TEXT,
        },
        thursday: {
            type: Sequelize.TEXT,
        },
        friday: {
            type: Sequelize.TEXT,
        },
        saturday: {
            type: Sequelize.TEXT,
        },
        sunday: {
            type: Sequelize.TEXT,
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
        inactivateReason: {
            type: Sequelize.STRING
        }
    };
}