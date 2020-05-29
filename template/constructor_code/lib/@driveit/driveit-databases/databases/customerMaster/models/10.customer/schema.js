const Sequelize = require("sequelize");
const StatusEnum = require('../enums/Status');
const errorDef = require('../../../../utils/error.codes');

module.exports = () => {
    return {
        id: { // get from id services
            type: Sequelize.STRING,
            primaryKey: true
        },
        countryId: {
            type: Sequelize.STRING,
            allowNull: false
        },
        customerAccountGroupId: {
            type: Sequelize.UUID,
            allowNull: false
        },
        regionId: {
            type: Sequelize.STRING,
            allowNull: false
        },
        salutationId: {
            type: Sequelize.STRING,
            allowNull: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        identityId: {
            type: Sequelize.STRING,
            allowNull: false
        },
        identityNo: {
            type: Sequelize.STRING,
            allowNull: false
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
        //  New field updated
        mareaOperatorCode: {
            type: Sequelize.STRING,
            allowNull: true
        },
        fareaOperatorCode: {
            type: Sequelize.STRING,
            allowNull: true
        },
        tareaOperatorCode: {
            type: Sequelize.STRING,
            allowNull: true
        }
    };
}