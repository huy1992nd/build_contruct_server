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
        code: {
          type: Sequelize.STRING(10),
          allowNull: true
        },
        name: {
          type: Sequelize.STRING(100),
          allowNull: true
        },
        mailfrom: {
          type: Sequelize.STRING(1000),
          allowNull: true,
          defaultValue: '0'
        },
        mailto: {
          type: Sequelize.STRING(1000),
          allowNull: true
        },
        mailcc: {
          type: Sequelize.STRING(1000),
          allowNull: true
        },
        mailbcc: {
          type: Sequelize.STRING(1000),
          allowNull: true
        },
        subjectformat: {
          type: Sequelize.STRING(200),
          allowNull: true
        },
        bodyformat: {
          type: Sequelize.TEXT,
          allowNull: true
        },
        emailport: {
          type: Sequelize.INTEGER(11),
          allowNull: true
        },
        emailhost: {
          type: Sequelize.STRING(128),
          allowNull: true
        },
        credentialusername: {
          type: Sequelize.STRING(128),
          allowNull: true
        },
        credentialpassword: {
          type: Sequelize.STRING(128),
          allowNull: true
        },
        credentialdomain: {
          type: Sequelize.STRING(128),
          allowNull: true
        },
        emailSentType: {
          type: Sequelize.STRING(100),
          allowNull: true
        },
        sendGridApiKey: {
          type: Sequelize.STRING(200),
          allowNull: true
        },
        emailsecure: {
          type: Sequelize.BOOLEAN,
          allowNull: true
        }
    };
}