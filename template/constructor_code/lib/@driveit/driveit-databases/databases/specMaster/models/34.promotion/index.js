const Sequelize = require("sequelize");
const schema = require('./schema');
var _ = require('lodash');

const tableName = "promotion";
const modelName = "promotion";
const Op = Sequelize.Op;
const Utils = require('../../../../utils/database.utils');


module.exports = class Promotion extends Sequelize.Model {

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
        this.myAssociation = this.belongsTo(models.Make, {
            foreignKey: 'makeId',
            targetKey: 'id'
        });
        this.myAssociation = this.belongsTo(models.Model, {
            foreignKey: 'modelId',
            targetKey: 'id'
        });
        this.myAssociation = this.belongsToMany(models.Variant, {
            through: models.PromotionVariant,
            as: 'variants',
            foreignKey: 'promotionId'
        });
        this.myAssociation = this.hasMany(models.PromotionItemSet, {
            foreignKey: 'promotionId',
            targetKey: 'id',
            as: 'promotionItemSets'
        });
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
            order: orderBy,
            distinct: true,
            col: 'id'
        });
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

    static addNew(obj, transaction) {
        
            return this.create(
                obj
                , {
                    returning: true,
                    transaction
                });
   
    }

    static updatePromotion(product, where, transaction) {
        
            return this.update(product, {
                where: where
            }, transaction);
       
    }
}