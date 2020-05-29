const Sequelize = require("sequelize");
const schema = require('./schema');
var _ = require('lodash');

const tableName = "product";
const modelName = "product";
const Op = Sequelize.Op;
const Utils = require('../../../../utils/database.utils');




const VariantModel = require('../03.variant');
const PackageModel = require('../17.package');
const ModelModel = require('../02.model');

const ModelWithPublisher = require('@driveit/publisher-lib').ModelWithPublisher;
module.exports = class Product extends ModelWithPublisher {
   
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
        this.myAssociation = this.belongsTo(models.Variant,{
            foreignKey: 'variantId',
            sourceKey: 'id'
        });
        this.myAssociation = this.belongsTo(models.Make,{
            foreignKey: 'makeId',
            sourceKey: 'id'
        });
        this.myAssociation = this.belongsTo(models.Model,{
            foreignKey: 'modelId',
            sourceKey: 'id'
        });
        this.myAssociation = this.belongsTo(models.Package,{
            foreignKey: 'packageId',
            sourceKey: 'id'
        });
    }

    //methods
    static getId(where) {
        let status = {};
        status['deleted'] = { [Op.not]: true };
        return this.findOne({
            where : {
                ...where,
                [Op.and]: status
            },
            // attributes: ["id"],
            order: [
                ["createdAt", "DESC"]
            ]
        });
    }

    static getAll(where, attributes = [], pagination = {limit:null,offset:0}, orderBy = ["createdAt", "DESC"]) {
        return this.findAndCountAll({
            where,
            attributes,
            ...pagination,
            order: [orderBy]
        });
    }

    static getAllWithIncludes(whereObj, includes, pagination, orderBy, filterArr = []) {
        filterArr = Utils.checkTextFilter(filterArr);
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
            distinct: true,
            // Bug Fixing: Previously it doesn't display the whole data (e.g: total data is 29 but just displayed 14)
            // include: [
            //     { model: VariantModel},
            //     { model: PackageModel}
            // ],
            ...pagination,
            order: [orderBy]
        });
    }
    
    static searchAll(likeArr = [], attributes = null, pagination, orderBy, filterArr = [], skipInclude = false) {
        let prepQry = [];
        let where = {};
        if(likeArr.length>0) {
            _.forEach(likeArr, (likeArrItem) => {
                let qry = {};
                qry[likeArrItem.colId] = {[Op.like]: likeArrItem.text};
                prepQry.push(qry);
            });
            where = {[Op.or]: prepQry};
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
                { model: VariantModel},
                { model: PackageModel},
                { model: ModelModel}
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
        if(likeArr.length>0) {
            _.forEach(likeArr, (likeArrItem) => {
                let qry = {};
                qry[likeArrItem.colId] = {[Op.like]: likeArrItem.text};
                prepQry.push(qry);
            });
            where = {
                [Op.or]: prepQry
            };
        };
        
        return this.findAll({
            where : {
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
                obj
                , {
                returning: true,
                transaction: transaction
            });
        
    }
    
    static updateProduct(product, where) {
        
            return this.update(product, {
                where: where
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


    // static async getPackageAccAndItems(ids){
    //     const res = PackageModel.findAll({
    //         where:{
    //             id:ids
    //         }
    //     });
    //     console.log(res);
    // }

}