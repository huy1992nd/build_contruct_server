const Sequelize = require("sequelize");
const schema = require('./schema');
var _ = require('lodash');

const tableName = "vehicleAccessories";
const modelName = "vehicleAccessories";
const Op = Sequelize.Op;
const Utils = require('../../../../utils/database.utils');




const VehicleModel = require('../09.vehicle');

// const ModelWithPublisher = require('@driveit/publisher-lib').ModelWithPublisher;
module.exports = class VehicleAccessories extends Sequelize.Model {
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
        this.myAssociation = this.belongsTo(models.Vehicle, {
            foreignKey: 'vehicleId'
        });
    }

    //methods
    static getOne(where, transaction = null) {
        return this.findOne({
            where,
            include: [{
                model: VehicleModel
            }]
        }, transaction);
    }

    static getAll(where, transaction = null) {
        return this.findAll({
            where,
            include: [{
                model: VehicleModel
            }]
        }, transaction);
    }

    static getRecords(pagination, orderBy, where, transaction = null) {
        return this.findAndCountAll({
            where,
            include: [{
                model: VehicleModel
            }],
            ...pagination,
            order: [orderBy],
        }, transaction);
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

    static addNew(obj, transaction) {
        
            return this.create(
                obj
                , {
                returning: true,
                transaction: transaction
              });
        
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
