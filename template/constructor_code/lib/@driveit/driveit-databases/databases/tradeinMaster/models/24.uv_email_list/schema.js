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
        branchcode: {
          type: Sequelize.STRING(10),
          allowNull: true
        },
        roleCode: {
          type: Sequelize.STRING(10),
          allowNull: true 
        },
        email: {
          type: Sequelize.STRING(100),
          allowNull: false
        },
        isRecipient: {
          type: Sequelize.INTEGER(1),
          allowNull: true
        },
        employeeId: {
          type: Sequelize.STRING(20),
          allowNull: true
        },
        recipientName: {
          type: Sequelize.STRING(100),
          allowNull: true
        }
    };
}