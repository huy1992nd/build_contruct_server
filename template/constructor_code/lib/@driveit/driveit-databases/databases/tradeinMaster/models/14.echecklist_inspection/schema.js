const Sequelize = require("sequelize");
const StatusEnum = require('../enums/Status');

module.exports = () => {
    return {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV1
        },
        echeckListId: {
            type: Sequelize.UUID,
            allowNull: false,
            // unique: true, // to allow update based on status 'deleted'
        },
        inspectionNo: {
            type: Sequelize.SMALLINT,
            allowNull: false,
            defaultValue: 0
        },
        inspectionDate: {
            type: Sequelize.DATE,
        },
        overallCondId: {
            type: Sequelize.UUID,
            // unique: true, // to allow update based on status 'deleted'
        },
        auctionPrc: {
            type: Sequelize.DECIMAL,
            // unique: true, // to allow update based on status 'deleted'
        },
        auctionDate: {
            type: Sequelize.DATE,
        },
        mosPrice: {
            type: Sequelize.DECIMAL,
            // unique: true, // to allow update based on status 'deleted'
        },
        estRepairCost: {
            type: Sequelize.DECIMAL,
            // unique: true, // to allow update based on status 'deleted'
        },
        onlineRetailPrc: {
            type: Sequelize.DECIMAL,
            // unique: true, // to allow update based on status 'deleted'
        },
        uvdQuotePrc: {
            type: Sequelize.DECIMAL,
            // unique: true, // to allow update based on status 'deleted'
        },
        uvdQuoteBy: {
            type: Sequelize.STRING,
            // unique: true, // to allow update based on status 'deleted'
        },
        uvdContactNo: {
            type: Sequelize.STRING,
            // unique: true, // to allow update based on status 'deleted'
        },
        customerAskPrc: {
            type: Sequelize.DECIMAL,
            // unique: true, // to allow update based on status 'deleted'
        },
        offerPrc: {
            type: Sequelize.DECIMAL,
            // unique: true, // to allow update based on status 'deleted'
        },
        lastPriceUpdatedAt: {
            type: Sequelize.DATE,
            // unique: true, // to allow update based on status 'deleted'
        },
        isEnableInspection: {
            type: Sequelize.TINYINT,
            allowNull: false,
            defaultValue: false
        },
        isTCMapPrice: {
            type: Sequelize.TINYINT,
            allowNull: false,
            defaultValue: false
        },
        lastOfferPrcAt: {
            type: Sequelize.DATE,
        },
        deleted: {
            type: Sequelize.TINYINT,
            allowNull: false,
            defaultValue: false
        },
        createdBy: {
            type: Sequelize.STRING,
            allowNull: false
        },
        updatedBy: {
            type: Sequelize.STRING,
            allowNull: false
        },
        createdfullname: {
            type: Sequelize.STRING
        },
        updatedfullname: {
            type: Sequelize.STRING
        }
    };
}