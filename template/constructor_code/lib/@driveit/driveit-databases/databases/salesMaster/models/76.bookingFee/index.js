const Sequelize = require("sequelize");
const schema = require('./schema');
var _ = require('lodash');

const modelName = "bookingFee";
const tableName = "bookingFee";
const Op = Sequelize.Op;
const Utils = require('../../../../utils/database.utils');

// module.exports = class VehicleBookingInsurance extends Sequelize.Model {
module.exports = class BookingFee extends Sequelize.Model {

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
            foreignKey: 'bookingNo', targetKey: 'id'
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
            order: [
                ["createdAt", "DESC"]
            ]
        });
    }

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

    static getAll(where, attribute = [], pagination = {limit:null,offset:0}, orderBy = ["createdAt", "DESC"]) {
        return this.findAndCountAll({
            where: {
                ...where,
                deleted: {
                    [Op.not]: true
                }
            },
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
    
    static updateVehicleBookingRefund(refund, where, transaction = null) {
        if (transaction === null) {
            
                return this.update(refund, {
                    where: where
                });
            
        } else {
            
                return this.update(
                    refund
                    , {
                    where: where,
                    returning: true,
                    transaction: transaction
                });
        }
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