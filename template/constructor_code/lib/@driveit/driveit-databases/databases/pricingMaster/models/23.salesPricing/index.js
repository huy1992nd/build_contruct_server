const Sequelize = require("sequelize");
const schema = require('./schema');
var _ = require('lodash');

const tableName = "salesPricing";
const modelName = "salesPricing";


// const PricingConditionType = require('../11.pricingConditionType/index');
// const PricingRules = require('../20.pricingRules/index');

// const ModelWithPublisher = require('publisher-lib').ModelWithPublisher;
// module.exports = class PricingRulesData extends ModelWithPublisher {
module.exports = class SalesPricing extends Sequelize.Model{


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
        // this.belongsTo('general_master.materialMasterBasicinfo',{
        //     foreignKey: 'materialMasterBasicinfoId'
        // });
        // this.belongsTo(models.PricingRules,{
        //     foreignKey: 'pricingRulesId'
        // });
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

    /**
     * 
     */
    static getSalesPricingVehicle(productId,countryId) {
        return new Promise(resolve=>{
            this.sequelize.query(`
            SELECT salesPricingVehicle.value, salesPricingVehicle.salesPricingId, pricingConditionType.code,registrationRegion, registrationRegionId,general_master.salesPricingVehicle.type,usageType FROM general_master.salesPricing
            INNER JOIN general_master.salesPricingVehicle ON general_master.salesPricingVehicle.salesPricingID = general_master.salesPricing.id
            INNER JOIN general_master.pricingConditionType ON general_master.pricingConditionType.id = general_master.salesPricingVehicle.pricingConditionTypeId
            WHERE general_master.salesPricing.productId = ? AND countryId = ? Order by salesPricingVehicle.updatedAt ASC
            `,{ replacements: [productId,countryId], type: Sequelize.QueryTypes.SELECT })
            .then( projects => {
                resolve(projects);
              })
        })
    }

    static getCount(){
        return this.sequelize.query(`
            SELECT * FROM general_master.salesPricing WHERE deleted = 0 group by productId`, 
            {type: Sequelize.QueryTypes.SELECT });
    }


}