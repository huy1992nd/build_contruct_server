const Sequelize = require("sequelize");
const StatusEnum = require('../enums/Status');

module.exports = () => {
    return {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV1
        },
        edisposalId: {
            type: Sequelize.UUID,
            allowNull: false,
        },
        edCycleId: {
            type: Sequelize.UUID,
            allowNull: false,
        },
        edRouteId: {
            type: Sequelize.UUID,
            allowNull: false,
        },
        uvRouteId: {
            type: Sequelize.UUID,
            allowNull: true,
        },
        routeCode: {
            type: Sequelize.STRING(10),
            allowNull: true
        },
        fileId: {
            type: Sequelize.UUID,
            allowNull: false,
        },
        fileUploadConfigId: {
            type: Sequelize.UUID,
        },
        deleted: {
            type: Sequelize.TINYINT,
            allowNull: false
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