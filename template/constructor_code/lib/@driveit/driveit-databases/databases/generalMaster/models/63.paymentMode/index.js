const Sequelize = require("sequelize");
const schema = require('./schema');
var _ = require('lodash');

const tableName = "paymentMode";
const modelName = "paymentMode";
const Op = Sequelize.Op;
const Utils = require('../../../../utils/database.utils');




const CountryModel = require('../../models/01.country');

// const ModelWithPublisher = require('@driveit/publisher-lib').ModelWithPublisher;
module.exports = class PaymentMode extends Sequelize.Model {

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
        this.myAssociation = this.belongsTo(models.Country, {
            foreignKey: 'countryId'
        });
    }

    //methods
    static getOne(where) {
        return this.findOne({
            where
        });
    }

    static getAll(where) {
        return this.findAll({
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
                model: CountryModel
            }];
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
            order: [orderBy],
            distinct: true
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
    // static addNew(record, transaction = null) {
    //     return this.create(record, {
    //         returning: true
    //     }, transaction);

    // }

    static updatePaymentMode(PaymentMethod, where) {
        
            return this.update(PaymentMethod, {
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