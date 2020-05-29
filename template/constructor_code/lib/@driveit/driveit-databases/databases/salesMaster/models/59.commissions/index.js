const Sequelize = require("sequelize");
const schema = require('./schema');
var _ = require('lodash');
const tableName = "commissions";
const modelName = "commissions";
const Op = Sequelize.Op;
const Utils = require('../../../../utils/database.utils');
const CommissionsDealer = require('../../models/61.commissionsDealer');
const CommissionsSalesAdvisor = require('../../models/60.commissionsSalesAdvisior');
module.exports = class Commissions extends Sequelize.Model {

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
        this.myAssociation = this.hasMany(models.CommissionsSalesAdvisor, {
            foreignKey: 'commissionsId'
        });
        this.myAssociation = this.hasMany(models.CommissionsDealer, {
            foreignKey: 'commissionsId'
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
        status['deleted'] = { [Op.not]: true };
        return this.findOne({
            where: {
                ...where,
                [Op.and]: status
            },
            include: [
            ],
            order: [
                ["createdAt", "DESC"]
            ]
        });
    }

    static getAll(where, attribute = [], pagination = { limit: null, offset: 0 }, orderBy = ["createdAt", "DESC"]) {
        return this.findAndCountAll({
            where: {
                ...where,
                deleted: {
                    [Op.not]: true
                }
            },
            ...pagination,
            include: [
            ],
            order: [orderBy]
        });
    }

    static getAllWithIncludes(pagination, orderBy, where, filterArr = []) {
        let arrFilter = Utils.filterGenerator(filterArr);

        if (arrFilter.length > 0) {
            _.forEach(arrFilter, (val) => {
                _.forEach(val, (v, k) => {
                    where[k] = v;
                });
            });
        }
        let include = [
            {
                model: CommissionsDealer
            },
            {
                model: CommissionsSalesAdvisor
            }
        ];

        return this.findAndCountAll({
            where: {
                ...where,
                deleted: {
                    [Op.not]: true
                }
            },
            include,
            distinct:true,
            ...pagination,
            order: [orderBy]
        });
    }

    static getRecords(pagination, orderBy, where, transaction = null) {
        let include = [
            {
                model: CommissionsDealer
            },
            {
                model: CommissionsSalesAdvisor
            }
        ];
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

    static searchAll(likeArr = [], attributes = null, pagination, orderBy, filterArr = [], skipInclude = false, filterByStatusArr = []) {
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

        if (filterByStatusArr.length > 0) {
            where["status"] = { [Op.in]: filterByStatusArr };
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
            ...pagination,
            order: [orderBy]
        };
        if (attributes !== null && !_.isEmpty(attributes)) {
            searchAllObj['attributes'] = attributes;
        }

        return this.findAndCountAll(searchAllObj);
    }

    static searchAllNoCount(likeArr, attributes = []) {
        let prepQry = [];
        let where = {};
        if (likeArr.length > 0) {
            _.forEach(likeArr, (likeArrItem) => {
                let qry = {};
                qry[likeArrItem.colId] = { [Op.like]: likeArrItem.text };
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
            include: [
            ],
            attributes
        });
    }

    static searchAllNoCount2(where) {
        return this.findAll({
            where: {
                [Op.or]: where
            }
        });
    }

    static addNew(obj, transaction) {
        return this.create(
            obj
            , {
                returning: true,
                transaction: transaction
            });
    }

    static updateRecord(dealer, where, transaction = null) {
        return this.update(
            dealer
            , {
                where: where,
                returning: true,
                transaction: transaction
            });
    }

    static deleteHard(where) {
        return this.destroy({
            where: where
        });
    }
    static deleteSoft(where, who) {
        return this.update({
            deleted: true, updatedBy: who
        }, {
            where: where
        });
    }

}