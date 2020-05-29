const Sequelize = require("sequelize");
const StatusEnum = require('../enums/Status');

module.exports = () => {
    return {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV1
        },
        companyId: {
            type: Sequelize.UUID
        },
        branchId: {
            type: Sequelize.UUID
        },
        monthPayroll: {
            type: Sequelize.STRING(50),
            allowNull: false
        },
        salePersonId: {
            type: Sequelize.UUID,
            allowNull: false
        },
        salePersonCode: {
            type: Sequelize.STRING,
            allowNull: false
        },
        amount: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false,
        },
        jvsGroupCode: {
            type: Sequelize.STRING,
            allowNull: false
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