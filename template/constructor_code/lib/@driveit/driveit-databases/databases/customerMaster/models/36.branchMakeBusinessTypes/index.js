const Sequelize = require("sequelize");
const schema = require('./schema');
var _ = require('lodash');

const tableName = "branchMakeBusinessType";
const modelName = "branchMakeBusinessType";


const BranchRoutes = require("../31.branchRoutes")
const Op = Sequelize.Op;



const Utils = require('../../../../utils/database.utils');

// const ModelWithPublisher = require('@driveit/publisher-lib').ModelWithPublisher;
module.exports = class BranchMakeBusinessType extends Sequelize.Model {
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
    }

    //methods
    static getOne(where) {
        return this.findOne({
            where
        });
    }

    static searchAll(likeArr, attributes = null, pagination, orderBy, filterArr = [], skipInclude = false, optShowAll = false) {
        let prepQry = [];
        let where = {};

        let whereFilter = [
            !optShowAll ? {
                deleted: false
            } : {}
        ]; //for filtering deleted

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
            ];
        }

        let searchAllObj = {
            where: {
                ...where,
                [Op.and]: whereFilter
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

    static getAll(where) {
        return this.findAll({
            where
        });
    }

    static getAllData(where, attributes = [], pagination = {
        limit: null,
        offset: 0
    }, orderBy = ["createdAt", "DESC"]) {
        return this.findAndCountAll({
            where,
            ...pagination,
            order: [orderBy]
        });
    }

    static addRecord(record) {
        // 
        return this.create(record, {
            returning: true
        });
        // });
    }

    static addNew(obj, transaction) {

        return this.create(
            obj, {
            returning: true,
            transaction: transaction
        });
    }

    static updateRecord(record, where) {

        return this.update(record, {
            where
        });
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

    static getBranchByDealer(likeArr, attributes = [], pagination, orderBy, filterArr = [], optShowAll = false, includeSearch = false) {
        let prepQry = [];
        let where = {};

        let whereFilter = [
            !optShowAll ? {
                deleted: false
            } : {}
        ]; //for filtering deleted

        let include = [];

        if (includeSearch) {
            include = [{
                model: Company,
                include: [{
                    model: DealerGroup
                }]
            }]
        }

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

        filterArr.forEach((eachFilter) => {
            switch (eachFilter.colId) {
                case "dealerGroupCode":
                    eachFilter.colId = '$company.dealerGroup.code$';
                    break;
            }
        })

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
                [Op.and]: whereFilter
            },
            attributes,
            include,
            ...pagination,
            order: [orderBy]
        });
    }

}