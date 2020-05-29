const Sequelize = require("sequelize");

module.exports = () => {
    return {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV1
        },
        serviceRepairId: {
            type: Sequelize.UUID,
            allowNull: false
        },
        chargeType: {
            type: Sequelize.STRING,
            allowNull: true
        },
        chargeToId: {
            type: Sequelize.UUID,
            allowNull: false
        },
        splitPercentage: {
            type: Sequelize.Sequelize.DECIMAL(15, 2),
            allowNull: false
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
    };
}