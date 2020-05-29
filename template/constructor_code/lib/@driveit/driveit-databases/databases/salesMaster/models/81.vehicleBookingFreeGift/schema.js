const Sequelize = require('sequelize');

module.exports = () => {
    return {
        id: {
            type: Sequelize.CHAR(36),
            primaryKey: true,
            defaultValue: Sequelize.UUIDV1
        },
        vehicleBookingId: {
            type: Sequelize.STRING,
            allowNull: true
        },
        materialMasterId: {
            type: Sequelize.STRING,
            allowNull: true
        },
        quantity: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
    };
};
