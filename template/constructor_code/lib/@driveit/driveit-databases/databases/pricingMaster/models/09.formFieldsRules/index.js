const Sequelize = require("sequelize");
const schema = require('./schema');
var _ = require('lodash');

const tableName = "formFieldsRules";
const modelName = "formFieldsRules";

// const ModelWithPublisher = require('publisher-lib').ModelWithPublisher;
// module.exports = class PricingRuleGroup extends ModelWithPublisher {
module.exports = class PricingRuleGroup extends Sequelize.Model{


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
        this.belongsTo(models.FormFields,{
            foreignKey: 'formFieldsId'
        })
        this.belongsTo(models.FormFieldsConditions,{
            foreignKey: 'formFieldsConditionsId'
        })
    }


    static getOne(where, transaction = null) {
        return this.findOne({
            where,
            include: [{ all: true, nested: true }]
        }, transaction);
    }

    static getAll(where, transaction = null) {
        return this.findAll({
            where,
            include: [{ all: true, nested: true }]
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