const Sequelize = require("sequelize");
const StatusEnum = require('../enums/Status');
const errorDef = require('../../../../utils/error.codes');
const RepairOrderParts = require('../12.repairOrderParts');
const RepairOrders = require('../07.repairOrder')
const MaterialMasterBasicInfo = require('../../../generalMaster/models/19.materialMaster');

module.exports = () => {
    return {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV1
        },
        repairOrderId: {
            type: Sequelize.UUID,
            references: {
                model: RepairOrders,
                key: 'id'
            }
        },
        companyCode: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        branchCode: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        repairOrderNo:{
            type:Sequelize.STRING,
            allowNull: false,
        },
        repairOrderDate:{
            type:Sequelize.STRING,
            allowNull: false,
        },
        roType:{
            type:Sequelize.STRING,
            allowNull: false,
        },
        chargeType:{
            type:Sequelize.STRING,
            allowNull: false,
        },
        repairOrderJobId:{
            type:Sequelize.STRING,
        },
        jobCode:{
            type:Sequelize.STRING,
        },
        repairOrderPartId:{
            type:Sequelize.STRING,
        },
        partCode:{
            type:Sequelize.STRING,
        },
        lpoNo:{
            type:Sequelize.STRING,  
        },
        costAmount:{
            type:Sequelize.STRING,  
        },
        invoiceNo:{
            type:Sequelize.STRING,  
        },
        invoiceDate:{
            type:Sequelize.STRING,  
        },
        documentDate:{
            type:Sequelize.STRING,  
        },
        generatedDate:{
            type:Sequelize.STRING,  
        },
        makeCode:{
            type:Sequelize.STRING
        },
        documentNo:{
            type:Sequelize.STRING
        },
        rowType:{
            type:Sequelize.STRING
        },
        actionPrefix:{
            type:Sequelize.STRING
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
        }
    };
}