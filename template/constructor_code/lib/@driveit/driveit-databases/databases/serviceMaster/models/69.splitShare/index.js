const Sequelize = require("sequelize");
const schema = require('./schema');
var _ = require('lodash');

const tableName = "split";
const modelName = "split";
const Op = Sequelize.Op;
const Utils = require('../../../../utils/database.utils');
const customerMaster = require('../../../customerMaster');

module.exports = class SplitShare extends Sequelize.Model {

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
        this.myAssociation = this.belongsTo(models.RepairOrder, {
            foreignKey: 'repairOrderId',
            sourceKey: 'id'
        });
        this.myAssociation = this.belongsTo(models.RepairOrderFlatRate, {
            foreignKey: 'repairOrderFlatRateId',
            sourceKey: 'id'
        });

        if (!_.isEmpty(customerMaster)) {
            this.myAssociation = this.hasOne(customerMaster.Customer, {
                sourceKey: "billTo",
                foreignKey: 'id',
                as: 'customer'
            });
        }
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

    static findWhere(where) {
        return this.findAll({
            where: where,
            include: [
                {
                    model: customerMaster.Customer,
                    as: 'customer',
                    include: [
                        {
                            model: customerMaster.CustomerDetails,
                            include: [{
                                model: customerMaster.CustomerContact,
                            }, ],

                        },
                    ]
                }
            ]
        });
    }

    static getRecords(pagination, orderBy, where, transaction = null) {
        return this.findAndCountAll({
            where,
            ...pagination,
            order: [orderBy],
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
            include = [];
        }

        let searchAllObj = {
            where: {
                ...where,
                deleted: {
                    [Op.not]: true
                }
            },
            include,
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

    static addNew(obj, transaction) {
        return this.create(
            obj
            , {
                returning: true,
                transaction: transaction
            });
    }

    static async addMultiRecords(datas) {
        return this.bulkCreate(datas);
    }

    static updateRecord(obj) {
        return this.upsert(obj);
    }

    // static updateRecord(record, where, transaction = null) {
    //     return this.update(record, {
    //         where,
    //         isNewRecord: false
    //     }, transaction);
    // }

    static deleteRecord(where, transaction = null) {
        return this.destroy({
            where: where
        }, transaction);
    }

}