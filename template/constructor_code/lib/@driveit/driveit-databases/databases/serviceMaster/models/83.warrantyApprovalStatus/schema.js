const Sequelize = require("sequelize");
const StatusEnum = require('../enums/Status');

module.exports = () => {
    return {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV1
        },
        warrantyApprovalId: {
            type: Sequelize.UUID,
            allowNull: false
        },
        status: {
            type: Sequelize.ENUM,
            values: StatusEnum.WARRANTY_APPROVAL_STATUS,
            allowNull: false
        },
        remarks: {
            type: Sequelize.STRING,
            allowNull: false
        },
        updatedBy: {
            type: Sequelize.UUID,
            allowNull: false
        },
        updatedName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        updatedAt: {
            type: Sequelize.DATE,
            allowNull: false
        }
    };
}