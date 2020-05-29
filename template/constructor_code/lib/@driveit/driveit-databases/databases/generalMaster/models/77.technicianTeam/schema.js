const Sequelize = require("sequelize");

module.exports = () => {
    return {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV1
        },
        code: {
            type: Sequelize.STRING
        },
        name: {
            type: Sequelize.STRING
        },
        branchId: {
            type: Sequelize.STRING
        },
        foreman1Id: {
            type: Sequelize.STRING
        },
        foreman2Id: {
            type: Sequelize.STRING
        },
        foreman3Id: {
            type: Sequelize.STRING
        },
        deleted: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        status: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        },
        employeeListId: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        createdBy: {
            type: Sequelize.STRING,
            allowNull: false
        },
        updatedBy: {
            type: Sequelize.STRING,
            allowNull: false
        },
        inactivateReason: {
            type: Sequelize.STRING
        },
    }
}