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
            allowNull: false
        },
        edCycleId: {
            type: Sequelize.UUID,
            allowNull: false
        },
        edRouteId: {
            type: Sequelize.UUID,
            allowNull: false
        },
        uvRouteId: {
            type: Sequelize.UUID,
            allowNull: false
        },
        routeCode: {
            type: Sequelize.STRING(10),
        },
        prcItemId: {
            type: Sequelize.UUID,
            allowNull: false
        },
        prcItemName: {
            type: Sequelize.STRING,
        },
        inputType: {
            type: Sequelize.STRING,
        },
        valdecimal: {
            type: Sequelize.STRING,
        },
        valtext: {
            type: Sequelize.STRING,
        },
        valdate: {
            type: Sequelize.STRING,
        },
        valbool: {
            type: Sequelize.TINYINT
        },
        fileId: {
            type: Sequelize.UUID,
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