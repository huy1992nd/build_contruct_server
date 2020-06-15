const Sequelize = require("sequelize");
const schema = require('./schema');
var _ = require('lodash');

const tableName = "jobDataUpload";
const modelName = "jobDataUpload";

// const ModelWithPublisher = require('@driveit/publisher-lib').ModelWithPublisher;
module.exports = class JobDataUpload extends Sequelize.Model {
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
        //not yet create master data
       /*  this.myAssociation = this.belongsTo(models.PartGroup, {
            foreignKey: 'uomId',
            targetKey: 'id'
        }); */
    }

    //methods
    static getOne(where, transaction = null) {
        return this.findOne({
            where
        }, transaction);
    }

    static getAll(where, transaction = null) {
        return this.findAll({
            where
        }, transaction);
    }


    static getRecords(pagination, orderBy, where, transaction = null) {
        return this.findAndCountAll({
            where,
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


}