const Sequelize = require("sequelize");
const StatusEnum = require('../enums/Status');

module.exports = () => {
    return {
        createdBy: {
            type: Sequelize.STRING(255),
            allowNull: false
        },
        createdAt: {
            type: Sequelize.DATE,
            allowNull: false
        },
        updatedBy: {
            type: Sequelize.STRING(255),
            allowNull: false
        },
        updatedAt: {
            type: Sequelize.DATE,
            allowNull: false
        },
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV1,
            unique: true
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
        prcItemId: {
            type: Sequelize.UUID,
            allowNull: false,
        },
        prcItemName: {
            type: Sequelize.STRING(100),
            allowNull: true
        },
        inputType: {
            type: Sequelize.STRING(20),
            allowNull: true
        },
        valdecimal: {
            type: Sequelize.DECIMAL,
            allowNull: true
        },
        valtext: {
            type: Sequelize.STRING(200),
            allowNull: true
        },
        valdate: {
            type: Sequelize.DATE,
            allowNull: true
        },
        fileId: {
            type: Sequelize.UUID,
            allowNull: true
        }
    };
}