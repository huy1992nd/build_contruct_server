const Sequelize = require("sequelize");
const schema = require('./schema');
var _ = require('lodash');
const Op = Sequelize.Op;
const tableName = "eDaftar";
const modelName = "eDaftar";

const ModelWithPublisher = require('@driveit/publisher-lib').ModelWithPublisher;
module.exports = class EDaftar extends ModelWithPublisher {
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
    // static associate(models) {
    //     this.myAssociation = this.belongsTo(models.ExcisePayment, {foreignKey: 'excisePaymentId'});
    // }

    //methods
    static getOne(where, transaction = null) {
        return this.findOne({
            where: {
                ...where,
                deleted: {
                    [Op.not]: true
                }
            }
        }, transaction);
    }

    static getAll(where, transaction = null) {
        return this.findAll({
            where: {
                ...where,
                deleted: {
                    [Op.not]: true
                }
            }
        }, transaction);
    }


    static getRecords(pagination, orderBy, where, transaction = null) {
        return this.findAndCountAll({
            where: {
                ...where,
                deleted: {
                    [Op.not]: true
                }
            },
            ...pagination,
            order: [orderBy],
        }, transaction);
    }

    static addRecord(record, transaction = null) {
        return this.create(record, {
            returning: true
        }, transaction);

    }
    static bulkInsert(records, transaction = null) {
        return this.bulkCreate(records, {
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

    // static getExcisePaymentHistory(include, pagination, orderBy, where, transaction = null) {
    //     return this.findAndCountAll({
    //         where,
    //         ...pagination,
    //         order: [orderBy],
    //         include,
    //         distinct: true,
    //         col: 'id'
    //     }, transaction);
    // }

    static hasRecord() {
        return this.findAll({
            limit: 1
        });
    }

}