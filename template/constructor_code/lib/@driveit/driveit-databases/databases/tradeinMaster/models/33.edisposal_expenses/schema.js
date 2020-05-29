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
            type: Sequelize.STRING,
            allowNull: false
        },
        edCycleId: {
            type: Sequelize.STRING,
            allowNull: false
        },
        edRouteId: {
            type: Sequelize.STRING,
        },
        uvRouteId: {
            type: Sequelize.UUID,
        },
        routeCode: {
            type: Sequelize.STRING(10),
        },
        expensesId: {
            type: Sequelize.UUID,
        },
        name: {
            type: Sequelize.STRING,
        },
        amount: {
            type: Sequelize.DECIMAL(15, 2)
        },
        seqNo: {
            type: Sequelize.TINYINT,
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