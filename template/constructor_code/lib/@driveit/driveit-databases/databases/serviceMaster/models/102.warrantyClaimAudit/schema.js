const Sequelize = require("sequelize");
const StatusEnum = require('../enums/Status');

module.exports = () => {
    return {
        id: {
            type: Sequelize.CHAR(36),
            primaryKey: true,
            defaultValue: Sequelize.UUIDV1
        },
        action: {
            type: Sequelize.ENUM,
            allowNull: false,
            values: [StatusEnum.warrantyClaimAction],
        },
        createdBy: {
            type: Sequelize.CHAR(36)
        },
        createdAt: {
            type: Sequelize.DATE
        },
        WarrantyIncidentId: {
            type: Sequelize.UUID,
            allowNull: true
        },
    };
}