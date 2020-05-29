const Sequelize = require("sequelize");

module.exports = () => {
    return {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV1
        },
        calendarDate: {
            type: Sequelize.DATEONLY,
            allowNull: false
        },
        holidayType: {
            type: Sequelize.STRING,
            allowNull: false
        },
        holidayName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        stateId: {
            type: Sequelize.STRING,
            allowNull: true
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