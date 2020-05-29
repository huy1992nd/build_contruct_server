const Sequelize = require("sequelize");
const StatusEnum = require('../enums/Status');
const errorDef = require('../../../../utils/error.codes');

module.exports = () => {
    return {
        id: {
            type: Sequelize.CHAR(36),
            primaryKey: true,
        },
        eExciseNo: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        chassisNo: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        engineNo: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        licenseNo: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        exciseRecipt: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        variantName: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        variantId: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        variantCode: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        releaseDate: {
            type: Sequelize.DATE,
            allowNull: true
        },
        applicationDate: {
            type: Sequelize.DATE,
            allowNull: true
        },
        yearMake: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        importDate: {
            type: Sequelize.DATE,
            allowNull: true
        },
        submittedDate: {
            type: Sequelize.DATE,
            allowNull: true
        },
        statusDetail: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        responseDate: {
            type: Sequelize.DATE,
            allowNull: true
        },
        tcmaExciseNo: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        status: {
            type: Sequelize.ENUM,
            allowNull: true,
            values: [StatusEnum.exciseEndorsementStatus],
        },
        deleted: {
            type: Sequelize.BOOLEAN,
            allowNull: true,
            defaultValue: false
        },
        createdBy: {
            type: Sequelize.STRING,
            allowNull: true
        },
        updatedBy: {
            type: Sequelize.STRING,
            allowNull: true
        },
        createdAt: {
            type: Sequelize.DATE,
            allowNull: true
        },
        updatedAt: {
            type: Sequelize.DATE,
            allowNull: true
        }
    };
}