const Sequelize = require("sequelize");
const schema = require('./schema');
var _ = require('lodash');

const tableName = "adhocOrder";
const modelName = "adhocOrder";
const Op = Sequelize.Op;
const Utils = require('../../../../utils/database.utils');
const AdhocOrderSetup = require('../29.adhocOrderSetup');

// const ModelWithPublisher = require('@driveit/publisher-lib').ModelWithPublisher;
module.exports = class AdhocOrder extends Sequelize.Model {
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
        this.myAssociation = this.hasMany(models.AdhocOrderSetup, {
            foreignKey: 'adhocOrderId'
        });
        this.myAssociation = this.hasMany(models.OrderList, {
            foreignKey: 'adhocOrderId'
        });
        this.myAssociation = this.hasMany(models.AdhocOrderPreorder, {
            foreignKey: 'adhocOrderId'
        });
    }

    //methods
    static getOne(where, transaction = null) {
        return this.findOne({
            where: {
                ...where,
                deleted: {
                    [Op.not]: true
                }
            },
            include: [{
                model: AdhocOrderSetup,
            }],
        }, transaction);
    }

    static getAll(where, transaction = null) {
        return this.findAll({
            where: {
                ...where,
                deleted: {
                    [Op.not]: true
                }
            },
            include: [{
                model: AdhocOrderSetup,
            }],
        }, transaction);
    }

    static getAllWithIncludes(whereObj, includes, pagination, adhocOrderBy, filterArr = []) {
        let arrFilter = Utils.filterGenerator(filterArr);

        if (arrFilter.length > 0) {
            _.forEach(arrFilter, (val) => {
                _.forEach(val, (v, k) => {
                    whereObj[k] = v;
                });
            });
        }

        return this.findAndCountAll({
            where: {
                ...whereObj,
                deleted: {
                    [Op.not]: true
                }
            },
            include: includes,
            ...pagination,
            order: [adhocOrderBy]
        });
    }

    static getRecords(pagination, adhocOrderBy, where, transaction = null) {
        return this.findAndCountAll({
            where: {
                ...where,
                deleted: {
                    [Op.not]: true
                }
            },
            include: [{
                model: AdhocOrderSetup
            }],
            ...pagination,
            order: [adhocOrderBy],
        }, transaction);
    }

    static getRecordsNoInclude(pagination, adhocOrderBy, where, transaction = null) {
        return this.findAndCountAll({
            where,
            ...pagination,
            order: [adhocOrderBy],
        }, transaction);
    }

    static searchAll(likeArr = [], attributes = null, pagination, orderBy, filterArr = [], skipInclude = false) {
        let prepQry = [];
        let where = {};
        if (likeArr.length > 0) {
            _.forEach(likeArr, (likeArrItem) => {
                let qry = {};
                qry[likeArrItem.colId] = { [Op.like]: likeArrItem.text };
                prepQry.push(qry);
            });
            where = { [Op.or]: prepQry };
        }

        let arrFilter = Utils.filterGenerator(filterArr);

        if (arrFilter.length > 0) {
            _.forEach(arrFilter, (val) => {
                _.forEach(val, (v, k) => {
                    where[k] = v;
                });
            });
        }

        let include = [];

        if (!skipInclude) {
            include = [
                { model: AdhocOrderSetup }
            ];
        }

        let searchAllObj = {
            where: {
                ...where,
                deleted: {
                    [Op.not]: true
                }
            },
            include,
            distinct: true,
            ...pagination,
            order: [orderBy]
        };
        if (attributes !== null && !_.isEmpty(attributes)) {
            searchAllObj['attributes'] = attributes;
        }

        return this.findAndCountAll(searchAllObj);
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