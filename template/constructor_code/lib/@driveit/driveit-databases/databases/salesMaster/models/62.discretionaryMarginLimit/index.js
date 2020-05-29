const Sequelize = require("sequelize");
const schema = require('./schema');
var _ = require('lodash');

const tableName = "discretionaryMarginLimit";
const modelName = "discretionaryMarginLimit";
const Op = Sequelize.Op;
const Utils = require('../../../../utils/database.utils');

const MarginLimitDealerValue = require('../../models/63.marginLimitDealerValues');
const MarginLimitDealerGroup = require('../../models/65.marginLimitDealerGroup');
const MarginLimitRegistrationRegion = require('../../models/68.marginLimitRegistrationRegion');

// const ModelWithPublisher = require('@driveit/publisher-lib').ModelWithPublisher;
module.exports = class DiscretionaryMarginLimit extends Sequelize.Model {
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
        this.myAssociation = this.hasMany(models.MarginLimitDealerValues, {
            foreignKey: 'discreationaryMarginLimitID',
            sourceKey: 'id'
        });
        this.myAssociation = this.hasMany(models.MarginLimitDealerGroup, {
            foreignKey: 'discreationaryMarginLimitID',
            sourceKey: 'id'
        });
        this.myAssociation = this.hasMany(models.MarginLimitRegistrationRegion, {
            foreignKey: 'discreationaryMarginLimitID',
            sourceKey: 'id'
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
            include: [
                {
                    model: MarginLimitDealerValue,
                },
                {
                    model: MarginLimitDealerGroup,
                },
                {
                    model: MarginLimitRegistrationRegion,
                },
            ],
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
            // attributes: ["id"],
            order: [
                ["createdAt", "DESC"]
            ]
        });
    }

    static getAll(where, transaction = null) {
        return this.findAll({
            where: {
                ...where,
                deleted: {
                    [Op.not]: true
                }
            },
            include: [
                {
                    model: MarginLimitDealerValue,
                },
                {
                    model: MarginLimitDealerGroup,
                },
                {
                    model: MarginLimitRegistrationRegion,
                },
            ],
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
            include = [
                {
                    model: MarginLimitDealerValue,
                },
                {
                    model: MarginLimitDealerGroup,
                },
                {
                    model: MarginLimitRegistrationRegion,
                },
            ];
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

    static searchAll(likeArr, attributes = null, pagination, orderBy, filterArr = [], skipInclude = false, filterTenant = []) {
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
        }

        let arrFilter = Utils.filterGenerator(filterArr);

        if (arrFilter.length > 0) {
            _.forEach(arrFilter, (val) => {
                _.forEach(val, (v, k) => {
                    where[k] = v;
                });
            });
        }

        // tenant handle
        if (filterTenant !== undefined && !_.isEmpty(filterTenant)) {
            let tenantObj = {};
            let companyObj = {};
            let branchObj = {};
            let arr = [];
            _.forEach(filterTenant, (v) => {
                if (v.colId === 'tenantId') {
                    tenantObj['tenantId'] = { [Op.in]: v.text };
                }
                if (v.colId === 'companyId') {
                    companyObj['companyId'] = { [Op.in]: v.text };
                }
                if (v.colId === 'branchId') {
                    branchObj['branchId'] = { [Op.in]: v.text };
                }
            });
            if (_.size(tenantObj) > 0) {
                arr.push(tenantObj);
            }
            if (_.size(companyObj) > 0) {
                arr.push(companyObj);
            }
            if (_.size(branchObj) > 0) {
                arr.push(branchObj);
            }
            if (!_.isEmpty(arr)) {
                where = {
                    ...where,
                    [Op.and]: {
                        [Op.or]: arr
                    }
                };
            }
        }

        let include = [];
        if (!skipInclude) {
            include = [
                { model: MarginLimitDealerValue },
                { model: MarginLimitRegistrationRegion },
                { model: MarginLimitDealerGroup }
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

    static addNew(record, transaction = null) {
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