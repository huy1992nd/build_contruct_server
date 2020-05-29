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
          allowNull: false
        },
        name: {
          type: Sequelize.STRING(100),
          allowNull: true
        },
        seqNo: {
          type: Sequelize.INTEGER(4),
          allowNull: false,
          defaultValue: '0'
        },
        next: {
          type: Sequelize.STRING(10),
          allowNull: true
        },
        nextBtnName: {
          type: Sequelize.STRING(100),
          allowNull: true
        },
        reroute: {
          type: Sequelize.STRING(10),
          allowNull: true
        },
        rerouteBtnName: {
          type: Sequelize.STRING(100),
          allowNull: true
        },
        isNewPriceGuide: {
          type: Sequelize.INTEGER(1),
          allowNull: false,
          defaultValue: '0'
        },
        isUpdPriceGuide: {
          type: Sequelize.INTEGER(1),
          allowNull: false,
          defaultValue: '0'
        },
        isUpdProposal: {
          type: Sequelize.INTEGER(1),
          allowNull: false,
          defaultValue: '0'
        },
        isSaveBtn: {
          type: Sequelize.TINYINT(1),
          allowNull: false,
          defaultValue: '0'
        },
        isSaveTCUV: {
          type: Sequelize.TINYINT(1),
          allowNull: false,
          defaultValue: '0'
        }
    };
}