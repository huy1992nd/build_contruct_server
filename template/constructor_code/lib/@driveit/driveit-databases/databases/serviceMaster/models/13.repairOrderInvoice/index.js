const Sequelize = require("sequelize");
const schema = require('./schema');
var _ = require('lodash');

const tableName = "repairOrderInvoice";
const modelName = "repairOrderInvoice";
const Op = Sequelize.Op;
const Utils = require('../../../../utils/database.utils');

const RepairOrder = require('../07.repairOrder');
// const jobType = require('../04.jobType');

// const ModelWithPublisher = require('@driveit/publisher-lib').ModelWithPublisher;
module.exports = class RepairOrderInvoice extends Sequelize.Model {

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
        this.myAssociation = this.belongsTo(models.RepairOrder, {
            foreignKey: 'repairOrderId'
        });
    }

    //methods
    static getOne(where, transaction = null) {
        return this.findOne({
            where,
            include: [{
                model: RepairOrder
            }]
        },
        transaction);
    }

    static getAll(where, transaction = null) {
        return this.findAll({
            where,
            include: [{
                model: RepairOrder
            }]
        }, transaction);
    }


    static getRecords(pagination, orderBy, where, transaction = null, skipInclude = false) {
        let include;
        if(!skipInclude) {
            include = [
                { model: RepairOrder },
                //{ model: jobType } // Bug Fixing on Invoice
            ];
        }
        return this.findAndCountAll({
            where,
            ...pagination,
            order: [orderBy],
            include,
        }, transaction);
    }

    static addRecord(record, transaction = null) {
        
            return this.create(record, {
                returning: true
            }, transaction);;
    }

    static updateRecord(record, where, transaction = null) {
        
        // return  this.build(all, {isNewRecord: false}).save();
            return this.update(record, {
                where,
                isNewRecord: false
            }, transaction);;
    }

    static deleteRecord(where, transaction = null) {
        
            return this.destroy({
                where: where
            }, transaction);;
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
        if (!skipInclude) {
            include = [
                { model: RepairOrder }
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


}