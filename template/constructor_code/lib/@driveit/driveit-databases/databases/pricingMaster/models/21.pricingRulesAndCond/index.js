const Sequelize = require("sequelize");
const schema = require('./schema');
var _ = require('lodash');

const tableName = "pricingRulesAndCond";
const modelName = "pricingRulesAndCond";

const PricingRules = require('../20.pricingRules/index');
const PricingConditionType = require('../11.pricingConditionType/index');

// const ModelWithPublisher = require('publisher-lib').ModelWithPublisher;
// module.exports = class PricingRulesAndCond extends ModelWithPublisher {
module.exports = class PricingRulesAndCond extends Sequelize.Model{


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
        this.belongsTo(models.PricingRules,{
            foreignKey: 'pricingRulesId'
        });
    }


    static getOne(where, transaction = null) {
        return this.findOne({
            where,
            include: [{ all: true, nested: true }]
        }, transaction);
    }

    static getAll(attributes = [],where, transaction = null) {
        return this.findAll({
            attributes:attributes,
            where
        }, transaction);
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

    static getPricingCondRules(conditionType,pagination = {limit:null,offset:0}, orderBy = ["sequence", "ASC"]) {
        return this.findAndCountAll({
            attributes: ['id','sequence'],
            include: [
                {
                    model: PricingRules,
                    attributes: ['id','code', 'name'],
                    where:{
                        status: "enabled"
                    }
                },
                {
                    model: PricingConditionType,
                    attributes: ['id','code', 'name'],
                    where:{
                        code: conditionType,
                        status: "enabled"
                    }
                }
            ],
            where:{
                status: "enabled"
            },
            ...pagination,
            order: [orderBy]
        })
    }

}