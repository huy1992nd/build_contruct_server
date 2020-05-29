const Sequelize = require("sequelize");
const schema = require('./schema');
var _ = require('lodash');

const Op = Sequelize.Op;
const tableName = "branchBusinessType";
const modelName = "branchBusinessType";
const Utils = require('../../../../utils/database.utils');




// const ModelWithPublisher = require('@driveit/publisher-lib').ModelWithPublisher;
module.exports = class BranchBusinessType extends Sequelize.Model {
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
        this.myAssociation = this.belongsTo(models.Branch, {
            foreignKey: 'branchId',
            sourceKey: 'id'
        });
        this.myAssociation = this.belongsTo(models.BusinessType, {
            foreignKey: 'businessTypeId',
            sourceKey: 'id'
        });
    }

    //methods
    static getOne(where) {
        return this.findOne({
            where
        });
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
            // attributes: ["id"],
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

    static getAllByIds(ids, attribute = [], pagination = {
        limit: null,
        offset: 0
    }, orderBy = ["createdAt", "DESC"]) {
        let where = {};
        if (!_.isEmpty(ids)) {
            where = {
                id: {
                    [Op.in]: ids
                }
            };
        }
        return this.findAndCountAll({
            where,
            ...pagination,
            order: [orderBy]
        });
    }

    static searchAll(likeArr, attributes = null, pagination, orderBy, filterArr = [], skipInclude = false) {
        let prepQry = [];
        let where = {};

        let whereFilter = [{
            deleted: false
        }]; //for filtering deleted

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
            include = [];
        }

        let searchAllObj = {
            where: {
                ...where,
                [Op.and]: whereFilter
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

    static getRecords(pagination, orderBy, where) {
        return this.findAndCountAll({
            where,
            ...pagination,
            order: [orderBy],
        });
    }

    static addRecord(record) {
        
            return this.create(record, {
                returning: true
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

}