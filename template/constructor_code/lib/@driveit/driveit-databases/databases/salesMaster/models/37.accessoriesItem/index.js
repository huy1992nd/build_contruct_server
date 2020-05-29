const Sequelize = require("sequelize");
const schema = require('./schema');
var _ = require('lodash');

const tableName = "accessoriesItem";
const modelName = "accessoriesItem";
const Op = Sequelize.Op;
const Utils = require('../../../../utils/database.utils');

const VehicleBookingModel = require('../01.vehicleBooking');
const AccessoriesFitmentDocumentModel = require('../38.accessoriesFitmentDocument');

// const ModelWithPublisher = require('@driveit/publisher-lib').ModelWithPublisher;
module.exports = class AccessoriesItem extends Sequelize.Model {

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
        this.myAssociation = this.belongsTo(models.AccessoriesFitmentDocument, {
            foreignKey: 'accessoriesFitmentDocumentId', targetKey: 'id'
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
            include: [
                {model: VehicleBookingModel},
                {model: AccessoriesFitmentDocumentModel}
            ],
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
            include: [
                {model: VehicleBookingModel},
                // {model: AccessoriesFitmentDocumentModel}
            ],
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
            include: includes.concat([
                {model: VehicleBookingModel},
                // {model: AccessoriesFitmentDocumentModel}
            ]),
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
                // { model: VehicleBookingModel },
                // { model: AccessoriesFitmentDocumentModel }
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
            include: [
                {model: VehicleBookingModel},
                // {model: AccessoriesFitmentDocumentModel}
            ],
            attributes
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

    static addNew(obj, transaction) {
        return this.create(
            obj
            , {
            returning: true,
            transaction: transaction
        });
    }
    
    static updateAccessoriesItem(accessoriesItem, where, transaction = null) {
        if (transaction !== null) {
            return this.update(accessoriesItem, {
                where: where
            }, transaction);
        } else {
            return this.update(accessoriesItem, {
                where: where
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