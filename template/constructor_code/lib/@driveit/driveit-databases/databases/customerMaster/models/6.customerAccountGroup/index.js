const Sequelize = require("sequelize");
const schema = require('./schema');
//const StatusEnum = require('../enums/Status');
var _ = require('lodash');

const tableName = "customerAccountGroup";
const modelName = "customerAccountGroup";

const Op = Sequelize.Op;
const Utils = require('../../../../utils/database.utils');




// const ModelWithPublisher = require('@driveit/publisher-lib').ModelWithPublisher;
module.exports = class CustomerAccountGroup extends Sequelize.Model {
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
        // this.myAssociation = this.hasMany(models.TenantsTags, {foreignKey: 'tagId'});
        this.myAssociation = this.hasMany(models.Customer, {
            foreignKey: 'customerAccountGroupId'
        });
    }

    //methods
    static getOne(where) {
        return this.findOne({
            where
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

    static searchAll(likeArr, attributes = null, pagination, orderBy, filterArr = [], skipInclude = false) {
        let prepQry = [];
        let where = {};

        let status = {};
        status['deleted'] = {
            [Op.not]: true
        };

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
                [Op.and]: status
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

    static addNew(obj, transaction) {
        
            return this.create(
                obj, {
                    returning: true,
                    transaction: transaction
                });
    }

    static updateCustomerAccountGroup(customerAccountGroup, where) {
        
            return this.update(customerAccountGroup, {
                where: where
            });
    }

    static deleteHard(ids) {
        
            return this.destroy({
                where: {
                    id: {
                        [Op.in]: ids
                    }
                }
            });
    }
    static deleteSoft(ids, obj) {
        
            obj['deleted'] = true;
            return this.update(
                obj, {
                    where: {
                        id: {
                            [Op.in]: ids
                        }
                    }
                });
    }

}