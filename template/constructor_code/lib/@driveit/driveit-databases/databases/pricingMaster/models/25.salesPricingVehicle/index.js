const Sequelize = require("sequelize");
const schema = require('./schema');
var _ = require('lodash');

const tableName = "salesPricingVehicle";
const modelName = "salesPricingVehicle";

const SalesPricingModel = require('../../models/23.salesPricing/index');
// const SalesPricingVehicle = require('../../models/25.salesPricingVehicle/index');

// const SalesPricingModel = require('../23.salesPricing/index');

// const ModelWithPublisher = require('publisher-lib').ModelWithPublisher;
// module.exports = class PricingRulesData extends ModelWithPublisher {
module.exports = class SalesPricingVehicle extends Sequelize.Model{


    //schema
    static init(sequelize, DataTypes, databaseName) {
        return super.init(schema(DataTypes), {
            tableName,
            modelName,
            schema: databaseName,
            sequelize
        });
    }
    //associations
    static associate(models) {
        this.belongsTo(models.PricingConditionType,{
            foreignKey: 'pricingConditionTypeId'
        });
        this.belongsTo(models.SalesPricing,{
            foreignKey: 'salesPricingId'
        });
    }


    static getOne(where, transaction = null) {
        return this.findOne({
            where,
            include: [{ all: true, nested: true }]
        }, transaction);
    }

    static getAll(where, attributes = [], pagination = {limit:null,offset:0}, orderBy = ["createdAt", "DESC"]) {
        return this.findAndCountAll({
            where,
            ...pagination,
            order: [orderBy]
        });
    }


    static getRecords(pagination, orderBy, where, transaction = null) {
        return this.findAndCountAll({
            where,
            include: [{ all: true, nested: true }],
            ...pagination,
            order: [orderBy],
        }, transaction);
    }

    static addRecord(record, transaction = null) {
        return this.create(record, {
            returning: true
        }, transaction);

    }

    static bulkAdd(dataArr){
        return this.bulkCreate(dataArr);
    } 

    static updateRecord(record, where, transaction = null) {
        return this.update(record, {
            where,
            isNewRecord: false
        }, transaction);
    }

    static deleteRecord(where, transaction = null) {
        return this.destroy({
            where: where
        }, transaction);
    }

    static findById(id, transaction = null) {
        return this.findAll({
            include: [{all: true,allNested: true}],
            where: [{
                id:id
            }] 
        }, transaction);
    }


    static getAllListingScreenOld(where, attributes = [], pagination = {limit:null,offset:0}, orderBy = ["createdAt", "DESC"]) {
        return this.findAll({
            where,
            include:[
                {
                    model: SalesPricingModel,
                    attributes:['countryId','productId','registrationRegion','validFrom','validTo','status'],
                    where:{
                        deleted:0
                    }
                }
            ],
            ...pagination,
            group: ['salesPricing.productId'],
            order: [orderBy]
        });
    }
    static getAllListingScreen(where, attributes = [], pagination = {limit:null,offset:0}, orderBy = ["createdAt", "DESC"]) {
        return this.sequelize.query(`SELECT 
        product.name AS productName, product.id AS productId,
        variant.name AS variantName, variant.id AS variantId,
        model.name AS modelName, model.id AS modelId,
        make.name AS makeName, make.id AS makeId,validFrom,validTo,
        salesPricing.minimumBookingFee, salesPricing.status,
        GROUP_CONCAT(DISTINCT salesPricing.registrationRegion SEPARATOR ',') as registrationRegion,
        GROUP_CONCAT(DISTINCT registration.id SEPARATOR ',') as registrationRegionId
        FROM salesPricingVehicle
        INNER JOIN salesPricing ON salesPricingVehicle.salesPricingId = salesPricing.id AND salesPricing.deleted = 0
        LEFT JOIN spec_master.product AS product ON product.id = general_master.salesPricing.productId AND general_master.salesPricing.deleted = 0
        LEFT JOIN spec_master.variant AS variant ON variant.id = spec_master.product.variantId AND spec_master.product.deleted = 0
        LEFT JOIN spec_master.model AS model ON model.id = spec_master.product.modelId AND spec_master.model.deleted = 0 
        LEFT JOIN spec_master.make AS make ON make.id = spec_master.product.makeId AND spec_master.product.deleted = 0             
        LEFT JOIN general_master.registrationRegion AS registration ON registration.name = general_master.salesPricing.registrationRegion and registration.deleted = 0
        WHERE (salesPricingVehicle.status = 'enabled') ${where}
        GROUP BY salesPricing.productId
        ORDER BY salesPricingVehicle.${orderBy[0]} ${orderBy[1]} LIMIT ?, ?`,{
            replacements: [pagination.offset,pagination.limit], 
            type: Sequelize.QueryTypes.SELECT 
        })
    }

    
}