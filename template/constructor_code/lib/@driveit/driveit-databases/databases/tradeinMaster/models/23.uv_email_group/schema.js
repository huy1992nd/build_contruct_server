const Sequelize = require("sequelize");
const StatusEnum = require('../enums/Status');

module.exports = () => {
    return {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV1
        },
        deleted: {
            type: Sequelize.TINYINT,
            allowNull: false
        },
        status: {
            type: Sequelize.ENUM,
            allowNull: false,
            defaultValue: StatusEnum.ENABLED,
            values: [StatusEnum.status],
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
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false
        },
        deleted: {
          type: Sequelize.INTEGER(1),
          allowNull: false,
          defaultValue: '0'
        },
        status: {
          type: Sequelize.ENUM('enabled','disabled','pending'),
          allowNull: false,
          defaultValue: 'enabled'
        },
        inactivateReason: {
          type: Sequelize.STRING(255),
          allowNull: true
        },
        routeCode: {
          type: Sequelize.STRING(10),
          allowNull: false
        },
        isSubmit: {
          type: Sequelize.INTEGER(1),
          allowNull: false,
          defaultValue: '0'
        },
        roleCode: {
          type: Sequelize.STRING(10),
          allowNull: false
        },
        isEmailRM: {
            type: Sequelize.TINYINT(1),
            allowNull: false,
            defaultValue: false
        },
        isEmailTCUV: {
            type: Sequelize.TINYINT(1),
            allowNull: false,
            defaultValue: false
        },
        nextRouteCode: {
          type: Sequelize.STRING(10),
          allowNull: true
        }
    };
}