const Sequelize = require("sequelize");
const schema = require('./schema');
var _ = require('lodash');

const tableName = "accessoriesFitment";
const modelName = "accessoriesFitment";
const Op = Sequelize.Op;
const Utils = require('../../../../utils/database.utils');

// const VehicleBookingModel = require('../01.vehicleBooking');

// const ModelWithPublisher = require('@driveit/publisher-lib').ModelWithPublisher;
module.exports = class AccessoriesFitment extends Sequelize.Model {

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
        this.myAssociation = this.belongsTo(models.VehicleBooking, {
            foreignKey: 'vehicleBookingId', targetKey: 'id'
        });
    }

    //methods
    static getOne(where, transaction = null) {
        return this.findOne({
            where: {
                ...where,
                deleted: {
                    [Op.not]: true
                }
            }
        }, transaction);
    }
    
    static getId(where) {
        let status = {};
        status['deleted'] = { [Op.not]: true };
        return this.findOne({
            where : {
                ...where,
                [Op.and]: status
            },
            // include: [{
            //     model: VehicleBookingModel
            // }],
            order: [
                ["createdAt", "DESC"]
            ]
        });
    }

    static getAll(where, attribute = [], pagination = {limit:null,offset:0}, orderBy = ["createdAt", "DESC"]) {
        return this.findAndCountAll({
            where: {
                ...where,
                deleted: {
                    [Op.not]: true
                }
            },
            ...pagination,
            // include: [{
            //     model: VehicleBookingModel
            // }],
            order: [orderBy]
        });
    }

    static getAllByFilter(attributes = [], pagination = { limit: null, offset: 0 }, orderBy = ["createdAt", "DESC"], filterArr = []) {
        let where = {};
        let arrFilter = Utils.filterGenerator(filterArr);

        if (arrFilter.length > 0) {
            _.forEach(arrFilter, (val) => {
                _.forEach(val, (v, k) => {
                    where[k] = v;
                });
            });
        }

        return this.findAndCountAll({
            where,
            ...pagination,
            order: [orderBy],
            attributes
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
            // include: includes.concat([
            //     {model: VehicleBookingModel}
            // ]),
            ...pagination,
            order: [orderBy]
        });
    } 
    
    static getCount(pagination, where = {}, filterArr = []) {

        let arrFilter = Utils.filterGenerator(filterArr);
        
        if (arrFilter.length > 0) {
            _.forEach(arrFilter, (val) => {
                _.forEach(val, (v, k) => {
                    where[k] = v;
                });
            });
        }

        return this.count({
            where,
            ...pagination,
        });
    }

    static searchAll(likeArr = [], attributes = null, pagination, orderBy, filterArr = [], skipInclude = false, filterTenant = []) {
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

        // tenant handle
        if (filterTenant !== undefined && !_.isEmpty(filterTenant)) {
            let tenantObj = {};
            let companyObj = {};
            let branchObj = {};
            let arr = [];
            _.forEach(filterTenant, (v) => {
                if (v.colId === 'tenantId') {
                    tenantObj['tenantId'] = { [Op.in]: v.text };
                }
                if (v.colId === 'companyId') {
                    companyObj['companyId'] = { [Op.in]: v.text };
                }
                if (v.colId === 'branchId') {
                    branchObj['branchId'] = { [Op.in]: v.text };
                }
            });
            if (_.size(tenantObj) > 0) {
                arr.push(tenantObj);
            }
            if (_.size(companyObj) > 0) {
                arr.push(companyObj);
            }
            if (_.size(branchObj) > 0) {
                arr.push(branchObj);
            }
            if (!_.isEmpty(arr)) {
                where = {
                    ...where,
                    [Op.and]: {
                        [Op.or]: arr
                    }
                };
            }
        }

        let include = [];

        if(!skipInclude) {
            include = [
                // { model: VehicleBookingModel }
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
            // include: [{
            //     model: VehicleBookingModel
            // }],
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
    
    static updateAccessoriesFitment(accessoriesFitment, where) {
        return this.update(accessoriesFitment, {
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