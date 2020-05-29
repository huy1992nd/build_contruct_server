const Sequelize = require("sequelize");
const StatusEnum = require('../enums/OrderListSetupStatus');
const errorDef = require('../../../../utils/error.codes');

module.exports = () => {
    return {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV1
        },
        adhocOrderSetupColorId:{
            type:Sequelize.UUID,
        },
        model:{
            type:Sequelize.STRING,
        },
        variant:{
            type:Sequelize.STRING,
        },
        product:{
            type:Sequelize.STRING,
        },
        color:{
            type:Sequelize.STRING,
        },
        exciseType:{
            type:Sequelize.STRING,
        },
        standardPackage:{
            type:Sequelize.STRING,
        },
        optionalPackage:{
            type:Sequelize.STRING(1000),
        },
        vehicleId:{
            type:Sequelize.STRING,
        },
        modelId:{
            type:Sequelize.STRING(40),
        },
        variantId:{
            type:Sequelize.STRING(40),
        },
        productId:{
            type:Sequelize.STRING(40),
        },
        colorId:{
            type:Sequelize.STRING(40),
            // allowNull:false
        },
        exciseTypeId:{
            type:Sequelize.STRING(40),
        },
        optionalPackageId:{
            type:Sequelize.STRING(1000),
        },
        standardPackageId:{
            type:Sequelize.STRING(40),
        },
        companyId:{
            type:Sequelize.STRING(40),
        },
        chassisNo:{
            type:Sequelize.STRING,
        },
        EngineNo:{
            type:Sequelize.STRING,
        },

        cancelReasonId: {
            type: Sequelize.STRING,
            allowNull: true
        },
        cancelOtherReason: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        rejectReasonId: {
            type: Sequelize.STRING,
            allowNull: true
        },
        rejectOtherReason: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        registrationRegionId: {
            type: Sequelize.UUID,
            defaultValue: '00000000-0000-0000-0000-000000000000',
            allowNull: true 
        },
        registrationRegion: { 
            type: Sequelize.STRING, 
            allowNull: true 
        },
        branchId: {
            type: Sequelize.UUID,
            allowNull: true 
        },
        storageLocationId: {
            type: Sequelize.UUID,
            allowNull: true 
        },
        storageLocationName: {
            type: Sequelize.STRING, 
            allowNull: true
        },
        optionalItemId: {
            type: Sequelize.STRING(1000),
            allowNull: true 
        },
        optionalItem: {
            type: Sequelize.STRING(1000),
            allowNull: true 
        },
        optionalItemCode: {
            type: Sequelize.STRING(1000),
            allowNull: true 
        },
        optionalPackageCode: {
            type: Sequelize.STRING(1000),
            allowNull: true 
        },
        status: {
            type: Sequelize.ENUM,
            allowNull: false,
            defaultValue: StatusEnum.NEW,
            values: [StatusEnum.status],
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
        orderType: {
            type: Sequelize.STRING,
            allowNull: true
        },
        orderDate:{
            type:Sequelize.DATE,
            allowNull:false,
            defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
        },
    };
}