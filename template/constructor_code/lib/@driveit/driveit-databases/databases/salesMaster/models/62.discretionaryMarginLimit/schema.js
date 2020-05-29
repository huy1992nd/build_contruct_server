const Sequelize = require("sequelize");
const StatusEnum = require('../enums/Status');
const errorDef = require('../../../../utils/error.codes');

module.exports = () => {
    return {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV1
            // type: Sequelize.STRING,
            // primaryKey: true
        },
        productId: {
            type: Sequelize.STRING,
            allowNull: false
        },
        bookingEffectiveStartDate: {
            type: Sequelize.STRING,
            allowNull: true
        },
        bookingEffectiveEndDate: {
            type: Sequelize.STRING,
            allowNull: true
        },
        registrationEffectiveStartDate: {
            type: Sequelize.STRING,
            allowNull: true
        },
        registrationEffectiveEndDate: {
            type: Sequelize.STRING,
            allowNull: true
        },
        // registrationRegions: {
        //     type: Sequelize.STRING,
        //     allowNull: false
        // },
        // delearGroup: {
        //     type: Sequelize.STRING,
        //     allowNull: false
        // },
        tenantId: {
            type: Sequelize.UUID,
            allowNull: true
        },
        companyId: {
            type: Sequelize.UUID,
            allowNull: true
        },
        branchId: {
            type: Sequelize.UUID,
            allowNull: true
        },

        status: {
            type: Sequelize.ENUM,
            allowNull: false,
            defaultValue: StatusEnum.FORECASTSTATUS.ENABLED,
            values: [StatusEnum.forecastStatus],
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
        }
    };
}