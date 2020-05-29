const Sequelize = require("sequelize");
const schema = require('./schema');
var _ = require('lodash');
const TenantGroup = require('../01.tenantGroup');

const tableName = "tenantGrouping";
const modelName = "tenantGrouping";

// const ModelWithPublisher = require('publisher-lib').ModelWithPublisher;
// module.exports = class TenantGrouping extends ModelWithPublisher {
module.exports = class TenantGrouping extends Sequelize.Model{


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
        this.myAssociation = this.belongsTo(models.TenantGroup, {
            foreignKey: 'tenantGroupId'
        });
    }

    //methods

    static getOne(where, transaction = null) {
        return this.findOne({
            where,
            include: [{
                model: TenantGroup
            }]
        }, transaction);
    }

    static getAll(where, transaction = null) {
        return this.findAll({
            where,
            include: [{
                model: TenantGroup
            }]
        }, transaction);
    }


    static getRecords(pagination, orderBy, where, transaction = null) {
        return this.findAndCountAll({
            where,
            include: [{
                model: TenantGroup
            }],
            ...pagination,
            order: [orderBy],
        }, transaction);
    }

    static addRecord(record, transaction = null) {
        return this.create(record, {
            returning: true
        }, transaction);

    }

    static addNew(obj, transaction) {
        return this.create(
            obj
            , {
            returning: true,
            transaction: transaction
          });
   
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


}