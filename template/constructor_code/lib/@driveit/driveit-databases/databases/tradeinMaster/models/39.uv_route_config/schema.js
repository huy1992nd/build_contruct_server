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
        deleted: {
            type: Sequelize.TINYINT(1),
            allowNull: false,
            defaultValue: '0'
        },
        status: {
            type: Sequelize.ENUM('enabled','disabled','pending'),
            allowNull: false,
            defaultValue: 'enabled'
        },
        inactivateReason: {
            type: Sequelize.STRING(255),
            allowNull: true
        },
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV1
        },
        uvRouteID: {
            type: Sequelize.UUID,
            allowNull: false,
        },
        routeCode: {
            type: Sequelize.STRING(10),
            allowNull: false
        },
        isSubmit: {
            type: Sequelize.TINYINT(1),
            allowNull: false
        },
        nextRouteCode: {
            type: Sequelize.STRING(10),
            allowNull: false
        },
        emailConfigId: {
            type: Sequelize.UUID,
            allowNull: true,
        }
    };
}