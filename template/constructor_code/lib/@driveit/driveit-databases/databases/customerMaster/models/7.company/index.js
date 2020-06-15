const Sequelize = require("sequelize");
const schema = require('./schema');
var _ = require('lodash');

const tableName = "company";
const modelName = "company";

const Op = Sequelize.Op;
const Utils = require('../../../../utils/database.utils');



const CalendarIndicatorModel = require('../../models/32.calendarIndicator');
// const ModelWithPublisher = require('@driveit/publisher-lib').ModelWithPublisher;
module.exports = class Company extends Sequelize.Model {
    //schema
    static init(sequelize, DataTypes, databaseName) {
        return super.init(schema(DataTypes), {
            tableName,
            modelName,
            schema: databaseName,
            sequelize
        });
    }

    static associate(models) {
        this.myAssociation = this.hasMany(models.Branch, {
            foreignKey: 'companyId'
        });
        this.myAssociation = this.hasMany(models.CalendarIndicator, {
            foreignKey: 'companyId',
            sourceKey: "id"
        });
        this.myAssociation = this.hasMany(models.Company, {
            foreignKey: 'parentCompanyId'
        });
        // this.myAssociation = this.hasMany(models.CustomerContact, {foreignKey: 'customerId'});
        this.myAssociation = this.belongsTo(models.Company, {
            foreignKey: 'parentCompanyId',
            targetKey: 'id'
        });
        this.myAssociation = this.belongsTo(models.DealerGroup, {
            foreignKey: 'dealerGroupId',
            targetKey: 'id'
        });
    }

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

    static getAllByIds(ids, attributes = [], pagination = {
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
            attributes,
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
            include = [{
                model: CalendarIndicatorModel
            }];
        }

        let searchAllObj = {
            where: {
                ...where,
                [Op.and]: whereFilter
            },
            include,
            ...pagination,
            order: [orderBy],
            distinct: true
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

    static addNew(obj, transaction) {
        
            return this.create(
                obj, {
                    returning: true,
                    transaction: transaction
                });
    }

    static updateCompany(company, where) {
        
            return this.update(company, {
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

    static getAllCompanyIds() {
        return this.findAll({
            attributes: ['id']
        });
    }

}