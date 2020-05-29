const Sequelize = require("sequelize");
const StatusEnum = require('../enums/Status');
const errorDef = require('../../../../utils/error.codes');

module.exports = () => {
    return {
        id: {
            type: Sequelize.UUID,
            // primaryKey: true,
            defaultValue: Sequelize.UUIDV1
        },
        code: {
            type: Sequelize.STRING,
            allowNull: false,
            primaryKey: true,
            //defaultValue: Sequelize.UUIDV1
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        prefix: {
            type: Sequelize.STRING,
            allowNull: false
        },
        type: {
            type: Sequelize.UUID,
            allowNull: false
        },
        typeName: {
            type: Sequelize.STRING
        },
        source: {
            type: Sequelize.STRING,
            allowNull: true
        },
        eligibleMethod: {
            type: Sequelize.STRING,
            allowNull: false
        },
        effectiveStartDate: {
            type: Sequelize.STRING,
            allowNull: true
        },
        effectiveEndDate: {
            type: Sequelize.STRING,
            allowNull: true
        },
        status: {
            type: Sequelize.ENUM,
            allowNull: false,
            defaultValue: StatusEnum.ENABLED,
            values: [StatusEnum.status],
        },
        serviceInterval: {
            type: Sequelize.STRING,
            allowNull: false
        },
        servicePackage: {
            type: Sequelize.STRING,
            allowNull: false
        },
        campaignPrice: {
            type: Sequelize.STRING
        },
        combineVouchers: {
            type: Sequelize.BOOLEAN
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
        },
        makeId: {
            type: Sequelize.STRING
        },
        billToParty: {
            type: Sequelize.UUID,
            allowNull: false
        }

    }
}