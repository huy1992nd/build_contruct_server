const Sequelize = require("sequelize");
const schema = require('./schema');
var _ = require('lodash');
const Rules = require('../03.rulesSetup');

const tableName = "pricingRules";
const modelName = "pricingRules";

// const ModelWithPublisher = require('publisher-lib').ModelWithPublisher;
// module.exports = class PricingRules extends ModelWithPublisher {
module.exports = class PricingRules extends Sequelize.Model{


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
        // parentPricingRuleId: {
        //     type: Sequelize.STRING(1),
        //     allowNull: true,
        // },
        // parentRuleID: {
        //     type: Sequelize.STRING,
        //     allowNull: true,
        // },
        // this.belongsTo(models.PricingRules,{
        //     foreignKey: 'parentPricingRuleId',
        //     sourceKey:'id'
        // })
        this.belongsTo(models.RulesSetup, {
            foreignKey: 'rulesSetupId'
        });
        this.belongsTo(models.TenantGroup, {
            foreignKey: 'groupId'
        });
        this.belongsTo(models.PricingRuleGroup, {
            foreignKey: 'pricingRuleGroupId'
        });
    }

    //methods

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