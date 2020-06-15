const Sequelize = require("sequelize");
const schema = require('./schema');
var _ = require('lodash');

const tableName = "pricingRecJoin";
const modelName = "pricingRecJoin";

// const ModelWithPublisher = require('publisher-lib').ModelWithPublisher;
// module.exports = class PricingRecJoin extends ModelWithPublisher {
module.exports = class PricingRecJoin extends Sequelize.Model{


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
        this.belongsTo(models.PricingRecKeys,{
            foreignKey: 'pricingRecKeysId'
        })
        this.belongsTo(models.PricingRecValues,{
            foreignKey: 'pricingRecValuesId'
        })
        this.belongsTo(models.PricingRec,{
            foreignKey: 'ppRecId'
        })
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

}