const Sequelize = require("sequelize");
const schema = require('./schema');
var _ = require('lodash');

const Op = Sequelize.Op;
const Utils = require('../../../../utils/database.utils');
const tableName = "forecastNew";
const modelName = "forecastNew";

const ForecastApprovalNew = require('../40.forecastApprovalNew');

// const ModelWithPublisher = require('@driveit/publisher-lib').ModelWithPublisher;
module.exports = class ForecastNew extends Sequelize.Model {
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
        this.myAssociation = this.hasMany(models.ForecastApprovalNew, {
            foreignKey: 'forecastId'
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
                model: ForecastApprovalNew
            }]
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
                model: ForecastApprovalNew
            }]
        }, transaction);
    }

    static getAllWithIncludes(whereObj, includes, pagination, orderBy, filterArr = []) {
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
                ...whereObj
            },
            include: includes,
            ...pagination,
            order: [orderBy]
        });
    }

    static getRecords(pagination, orderBy, where, transaction = null, skipInclude = false) {
        let include;

        if (!skipInclude) {
            include = [{
                model: ForecastApprovalNew
            }];
        }

        return this.findAndCountAll({
            where: {
                ...where,
                deleted: {
                    [Op.not]: true
                }
            },
            include,
            ...pagination,
            order: [orderBy],
        }, transaction);
    }

    static getRecordsNoInclude(pagination, orderBy, where, transaction = null) {
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

    static searchAll(likeArr = [], attributes = null, pagination, orderBy, filterArr = [], skipInclude = false) {
        let prepQry = [];
        let where = {};
        if(likeArr.length>0) {
            _.forEach(likeArr, (likeArrItem) => {
                let qry = {};
                qry[likeArrItem.colId] = {[Op.like]: likeArrItem.text};
                prepQry.push(qry);
            });
            where = {[Op.or]: prepQry};
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

        if(!skipInclude) {
            include = [
                { model: ForecastApprovalNew }
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