const Sequelize = require("sequelize");
const schema = require('./schema');
var _ = require('lodash');

const tableName = "variant";
const modelName = "variant";
const Op = Sequelize.Op;
const Utils = require('../../../../utils/database.utils');




const ModelWithPublisher = require('@driveit/publisher-lib').ModelWithPublisher;
module.exports = class Variant extends ModelWithPublisher {
   
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
        this.myAssociation = this.hasMany(models.Vehicle,{
            foreignKey: 'variantId',
            sourceKey: 'id'
        });
        this.myAssociation = this.hasMany(models.Product,{
            foreignKey: 'variantId',
            sourceKey: 'id'
        });
        this.myAssociation = this.belongsTo(models.Make, {foreignKey: 'makeId', targetKey: 'id'});
        this.myAssociation = this.belongsTo(models.Model, {foreignKey: 'modelId', targetKey: 'id'});
        this.myAssociation = this.belongsTo(models.VehicleUsage, {foreignKey: 'vehicleUsageId', targetKey: 'id'});
        this.myAssociation = this.belongsTo(models.VehicleType, {foreignKey: 'vehicleTypeId', targetKey: 'id'});
        this.myAssociation = this.belongsTo(models.EngineType, {foreignKey: 'engineTypeId', targetKey: 'id'});
        this.myAssociation = this.belongsTo(models.TransmissionType, {foreignKey: 'transmissionTypeId', targetKey: 'id'});
        this.myAssociation = this.belongsTo(models.BodyType, {foreignKey: 'bodyTypeId', targetKey: 'id'});
        this.myAssociation = this.belongsTo(models.AssemblyType, {foreignKey: 'assemblyTypeId', targetKey: 'id'});
        this.myAssociation = this.belongsToMany(models.Promotion, {
            through: models.PromotionVariant,
            as: 'promotions',
            foreignKey: 'variantId'
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

    static getRecords(pagination, orderBy, where, transaction = null) {
        return this.findAndCountAll({
            where,
            ...pagination,
            order: [orderBy],
        }, transaction);
    }
    
    static getAll(where, attribute = [], pagination = {limit:null,offset:0}, orderBy = ["createdAt", "DESC"]) {
        return this.findAndCountAll({
            where,
            ...pagination,
            order: [orderBy]
        });
    }

    static getAllWithIncludes(whereObj, includes, pagination, orderBy, filterArr = [], distKeys = null) {
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
            group: distKeys,
            include: includes,
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
    
    static updateVariant(variant, where) {
        
            return this.update(variant, {
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

}