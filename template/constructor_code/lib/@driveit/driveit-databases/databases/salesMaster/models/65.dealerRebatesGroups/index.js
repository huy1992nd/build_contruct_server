const Sequelize = require("sequelize");
const schema = require('./schema');
var _ = require('lodash');
// const VehicleBookingModel = require('../01.vehicleBooking');

const tableName = "dealerRebatGroups";
const modelName = "dealerRebatGroups";
const Op = Sequelize.Op;
const Utils = require('../../../../utils/database.utils');

module.exports = class DealerRebatGroups extends Sequelize.Model {

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
        this.myAssociation = this.belongsTo(models.DealerRebates, {
            foreignKey: 'dealerRebatesId',
            targetKey: 'id'
        });
        this.myAssociation = this.belongsTo(models.DealerGroupRelation, {
            foreignKey: 'dealerGroupRelationId',
            targetKey: 'id'
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
            }
        }, transaction);
    }

    static getId(where) {
        let status = {};
        status['deleted'] = {
            [Op.not]: true
        };
        return this.findOne({
            where: {
                ...where,
                [Op.and]: status
            },
            order: [
                ["createdAt", "DESC"]
            ]
        });
    }

    static getAll(where, attribute = [], pagination = {
        limit: null,
        offset: 0
    }, orderBy = ["createdAt", "DESC"]) {
        return this.findAndCountAll({
            where,
            ...pagination,
            order: [orderBy]
        });
    }


    static addRecord(record, transaction = null) {
        return this.create(record, {
            returning: true
        }, transaction);
    }

    static getAllByFilter(attributes = [], pagination = {
        limit: null,
        offset: 0
    }, orderBy = ["createdAt", "DESC"], filterArr = []) {
        let where = {};
        let arrFilter = Utils.filterGenerator(filterArr);

        if (arrFilter.length > 0) {
            _.forEach(arrFilter, (val) => {
                _.forEach(val, (v, k) => {
                    where[k] = v;
                });
            });
        }

        return this.findAndCountAll({
            where: {
                ...where,
                deleted: {
                    [Op.not]: true
                }
            },
            ...pagination,
            order: [orderBy],
            attributes
        });
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
            ...pagination,
            order: [orderBy]
        });
    }

    static getCount(pagination, where = {}, filterArr = []) {

        let arrFilter = Utils.filterGenerator(filterArr);

        if (arrFilter.length > 0) {
            _.forEach(arrFilter, (val) => {
                _.forEach(val, (v, k) => {
                    where[k] = v;
                });
            });
        }

        return this.count({
            where,
            ...pagination,
        });
    }

    static searchAll(likeArr, attribute = [], pagination, orderBy, filterArr = [], includes = []) {
        let prepQry = [];
        let where = {};
        if (likeArr.length > 0) {
            _.forEach(likeArr, (likeArrItem) => {
                let qry = {};
                qry[likeArrItem.colId] = {
                    [Op.like]: likeArrItem.text
                };
                prepQry.push(qry);
            });
            where = {
                [Op.or]: prepQry
            };
        }
        return this.findAndCountAll({
            where: {
                ...where,
                [Op.and]: Utils.filterGenerator(filterArr)
            },
            // include: includes,
            ...pagination,
            order: [orderBy]
        }).then(response => {
            return this.findAndCountAll({
                where: {
                    ...where,
                    [Op.and]: Utils.filterGenerator(filterArr)
                },
                include: includes,
                ...pagination,
                order: [orderBy]
            }).then((response1) => {
                response1.count = response.count
                return response1;
            })

        })
    }

    static searchAllNoCount(likeArr, attributes = []) {
        let prepQry = [];
        let where = {};
        if (likeArr.length > 0) {
            _.forEach(likeArr, (likeArrItem) => {
                let qry = {};
                qry[likeArrItem.colId] = {
                    [Op.like]: likeArrItem.text
                };
                prepQry.push(qry);
            });
            where = {
                [Op.or]: prepQry
            };
        };

        return this.findAll({
            where: {
                ...where,
                deleted: {
                    [Op.not]: true
                }
            },
            attributes
        });
    }

    static addNew(obj, transaction) {
        return this.create(
            obj, {
                returning: true,
                transaction: transaction
            });
    }

    static updatDealerRebatGroups(dealerRebatGroups, where) {
        return this.update(dealerRebatGroups, {
            where: where
        });
    }

    static deleteRecord(where, transaction = null) {
        return this.destroy({
            where: where
        }, transaction);
    }


    static deleteHard(where) {
        return this.destroy({
            where: where
        });
    }
    static deleteSoft(where, who) {
        return this.update({
            deleted: true,
            updatedBy: who
        }, {
            where: where
        });
    }

}