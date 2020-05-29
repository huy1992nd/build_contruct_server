const Sequelize = require("sequelize");
const schema = require('./schema');
var _ = require('lodash');
const tableName = "contractorDetailes";
const modelName = "contractorDetailes";
const Op = Sequelize.Op;
const Utils = require('../../../../utils/database.utils');



module.exports = class ContractorDetailes extends Sequelize.Model {

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
            foreignKey: 'vehicleId',
            targetKey: 'id'
        });
        
        this.myAssociation = this.belongsTo(models.OICRectification, {
            foreignKey: 'oicRectificationId',
            targetKey: 'id'
        });
    }

    //methods
    static getOne(where, transaction = null) {
        return this.findOne({
            where
        }, transaction);
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
            order: [
                ["createdAt", "DESC"]
            ]
        });
    }

    static getAll(where, attribute = [], pagination = {limit: null, offset: 0}, orderBy = ["createdAt", "DESC"]) {
        return this.findAndCountAll({
            where,
            ...pagination,
            order: [orderBy],
            // include: [
            //     { model: VehicleModel},
            // ]
        });
    }

    static getAllWithIncludes(whereObj, pagination, orderBy, filterArr = [], vehicleCondition = {}) {
        let arrFilter = Utils.filterGenerator(filterArr);
        
        // handle search filter for vehicle-release module
        let vehicleMovementKey = ['batchNoFrom', 'batchNoTo']; 
        let vehicleMovementWhere = {};
        if (arrFilter.length > 0) {
            _.forEach(arrFilter, (val) => {
                _.forEach(val, (v, k) => {
                    if (vehicleMovementKey.includes(k)) {
                        v = v[Op.in];
                        if(k === 'batchNoFrom') {
                            vehicleMovementWhere['batchNo'] = 
                            {...vehicleMovementWhere['batchNo'], [Op.gte] : Number(v)};
                        }
                        if(k === 'batchNoTo') {
                            vehicleMovementWhere['batchNo']= 
                            {...vehicleMovementWhere['batchNo'], [Op.lte] : Number(v)};
                        }
                    } else {
                        whereObj[k] = v;
                    }
                });
            });
        }

        // console.log(vehicleMovementWhere)

        return this.findAndCountAll({
            where: {
                ...whereObj,
            },
            distinct:true,
            ...pagination,
            order: [orderBy],
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

    static updateContractorDetails(model, where) {
        
            return this.update(model, {
                where: where
            });
        
    }

    static bulkUpdate(vehicle, where, transaction) {
        
            return this.update(
                vehicle
                , {
                where: where,
                returning: true,
                transaction: transaction
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