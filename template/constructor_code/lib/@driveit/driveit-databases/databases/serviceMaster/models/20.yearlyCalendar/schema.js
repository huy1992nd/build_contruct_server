const Sequelize = require("sequelize");

module.exports = () => {
    return {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV1
        },
        year: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        countryId: {
            type: Sequelize.STRING,
            allowNull: false
        },
        companyId: {
            type: Sequelize.STRING,
            allowNull: false
        },
        nationalHolidayCount: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        regionalHolidayCount: {
            type: Sequelize.INTEGER,
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