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
        edLogId: {
            type: Sequelize.UUID,
            allowNull: false,
        },
        uvRouteId: {
            type: Sequelize.UUID,
            allowNull: true,
        /*     references: {
                model: 'uv_route',
                key: 'id'
            } */
        },
        routeCode: {
            type: Sequelize.STRING(10),
            allowNull: true
        },
        uvEmailId: {
            type: Sequelize.UUID,
            allowNull: true,
        },
        branchcode: {
            type: Sequelize.STRING(10),
            allowNull: true
        },
        roleCode: {
            type: Sequelize.STRING(10),
            allowNull: true
        },
        email: {
            type: Sequelize.STRING(200),
            allowNull: true
        }
    };
}