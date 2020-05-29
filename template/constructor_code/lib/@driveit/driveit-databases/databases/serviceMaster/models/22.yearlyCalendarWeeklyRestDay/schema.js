const Sequelize = require("sequelize");

module.exports = () => {
    return {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV1
        },
        stateId: {
            type: Sequelize.STRING,
            allowNull: false
        },
        day: {
            type: Sequelize.STRING,
            allowNull: false
        },
        // status: {
        //     type: Sequelize.ENUM,
        //     allowNull: true,
        //     values: [StatusEnum.status],
        //     defaultValue: StatusEnum.ENABLED,
        // },
        deleted: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        // inactivateReason: {
        //     type: Sequelize.STRING
        // },
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