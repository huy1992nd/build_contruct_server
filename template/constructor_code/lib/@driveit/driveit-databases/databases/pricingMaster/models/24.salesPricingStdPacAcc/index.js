const Sequelize = require("sequelize");
const schema = require('./schema');
var _ = require('lodash');

const tableName = "salesPricingStdPacAcc";
const modelName = "salesPricingStdPacAcc";


// const SalesPricingModel = require('../23.salesPricing/index');

// const ModelWithPublisher = require('publisher-lib').ModelWithPublisher;
// module.exports = class PricingRulesData extends ModelWithPublisher {
module.exports = class SalesPricingStdPacAcc extends Sequelize.Model{


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
        this.belongsTo(models.SalesPricing,{
            foreignKey: 'salesPricingID'
        });
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

}