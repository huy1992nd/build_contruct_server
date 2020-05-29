const Sequelize = require("sequelize");
const TenantEnum = require("../enums/Tenants");

module.exports = () => {
    return {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV1
        },
        status: {
            type: Sequelize.ENUM,
            allowNull: false,
            defaultValue: TenantEnum.PENDING,
            values: [TenantEnum.status],
        },
        inactivateReason: {
            type: Sequelize.STRING,
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