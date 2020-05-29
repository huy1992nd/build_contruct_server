/*jshint esversion: 9 */
const Sequelize = require("sequelize");
const StatusEnum = require('../enums/Status');
const errorDef = require('../../../../utils/error.codes');

module.exports = () => {
    return {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV1
        },
        startDate : {
            type: Sequelize.DATEONLY,
            allowNull: true
        },
        endDate : {
            type: Sequelize.DATEONLY,
            allowNull: true
        },
        counterFrom : {
            type: Sequelize.STRING,
            allowNull: true
        },
        counterTo : {
            type: Sequelize.STRING,
            allowNull: true
        },
        partNo : {
            type: Sequelize.STRING,
            allowNull: true
        },
        description : {
            type: Sequelize.STRING,
            allowNull: true
        },
        invoiceNo : {
            type: Sequelize.STRING,
            allowNull: true
        },
        vehicleId : {
            type: Sequelize.STRING,
            allowNull: false
        },
        bookingId : {
            type: Sequelize.STRING,
            allowNull: true
        },
        roId : {
            type: Sequelize.STRING,
            allowNull: true
        },
        /** duplicate from warrantyCategory. This is to support manual upload */
        warrantyType: {
            type: Sequelize.STRING,
            allowNull: true
        },
        coverageWarrantyPeriod: {
            type: Sequelize.STRING,
            allowNull: true
        },
        coverageWarrantyPeriodUom: {
            type: Sequelize.STRING,
            allowNull: true
        },
        mileageCoverageKM: {
            type: Sequelize.STRING,
            allowNull: true
        },
        mielageCoverageKMUom: {
            type: Sequelize.STRING,
            allowNull: true
        },
        counterUom: {
            type: Sequelize.STRING,
            allowNull: true
        },
        status: {
            type: Sequelize.ENUM,
            allowNull: false,
            defaultValue: StatusEnum.ENABLED,
            values: [StatusEnum.status],
        },
        inactivateReason: {
            type: Sequelize.STRING,
            allowNull: true
        },
        deleted: {
            type: Sequelize.BOOLEAN,
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
        warrantyCategoryId: {
            type: Sequelize.UUID,
            references: {
                model: 'warrantyCategory',
                key: 'id'
            },
        },
    };
};