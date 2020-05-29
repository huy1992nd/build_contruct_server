const Sequelize = require("sequelize");
const StatusEnum = require('../enums/Status');

module.exports = () => {
    return {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV1
        },
        prcItemId: {
            type: Sequelize.UUID
        },
        transactionType: {
            type: Sequelize.STRING
        },
        seqNo: {
            type: Sequelize.TINYINT
        },
        isUploadImg: {
            type: Sequelize.TINYINT
        },
        isHidden: {
            type: Sequelize.TINYINT
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
        }
    };
}