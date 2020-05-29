const Sequelize = require("sequelize");
const StatusEnum = require('../enums/Status');

module.exports = () => {
    return {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV1
        },
        edCycleId: {
            type: Sequelize.UUID,
            allowNull: false
        },
        edisposalId: {
            type: Sequelize.STRING,
            allowNull: false
        },
        uvRouteId: {
            type: Sequelize.UUID
        },
        createdname: {
            type: Sequelize.STRING
        },
        updatedname: {
            type: Sequelize.STRING
        },
        comment: {
            type: Sequelize.STRING
        },
        topmcomment: {
            type: Sequelize.STRING
        },
        edRouteIdPG: {
            type: Sequelize.STRING
        },
        edRouteCodePG: {
            type: Sequelize.STRING
        },
        edRouteIdDP: {
            type: Sequelize.STRING
        },
        edRouteCodeDP: {
            type: Sequelize.STRING
        },
        deleted: {
            type: Sequelize.TINYINT,
            allowNull: false
        },
        createdBy: {
            type: Sequelize.STRING,
            allowNull: false
        },
        updatedBy: {
            type: Sequelize.STRING,
            allowNull: false
        },
        prcChannelId: {
            type: Sequelize.UUID
        },
        prcPriceItemId: {
            type: Sequelize.UUID
        },
        proposedPrice: {
            type: Sequelize.DECIMAL(15, 2)
        },
        isEmailRM: {
            type: Sequelize.TINYINT(1),
            allowNull: true
        },
        isEmailTCUV: {
            type: Sequelize.TINYINT(1),
            allowNull: true
        }
    };
}