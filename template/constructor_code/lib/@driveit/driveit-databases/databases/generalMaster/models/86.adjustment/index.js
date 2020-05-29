const Sequelize = require("sequelize");
const schema = require('./schema');
var _ = require('lodash');

const tableName = "adjustment";
const modelName = "adjustment";
const Op = Sequelize.Op;
const Utils = require('../../../../utils/database.utils');

const InvoiceModel = require('../83.invoiceHeader');
const InvoiceItemModel = require('../84.invoiceItem');
const AdjustmentActivityLogModel = require('../87.adjustmentActivityLog');
const ServiceMaster = require('../../../serviceMaster');
const CustomerMaster = require('../../../customerMaster');

// const ModelWithPublisher = require('@driveit/publisher-lib').ModelWithPublisher;
module.exports = class Adjustment extends Sequelize.Model {

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
        this.myAssociation = this.belongsTo(models.InvoiceHeader, {
            foreignKey: 'invoiceHeaderId',
            sourceKey: 'id'
        });
        this.myAssociation = this.hasMany(models.AdjustmentActivityLog, {
            foreignKey: 'adjustmentId',
            sourceKey: 'id'
        }, {
            onDelete: 'CASCADE'
        });
        if(!_.isEmpty(CustomerMaster)) {
            this.myAssociation = this.hasOne(CustomerMaster.Branch, {
                foreignKey: 'id',
                sourceKey: "branchId",
            });
        }
    }

    //methods
    static getOne(where, transaction = null) {
        return this.findOne({
            where,
            include: [{ model: InvoiceModel }, { model: AdjustmentActivityLogModel }]
        }, transaction);
    }

    static getAll(where, transaction = null) {
        return this.findAll({
            where,
            include: [{ model: InvoiceModel }, { model: AdjustmentActivityLogModel }]
        }, transaction);
    }

    static getRecords(pagination, orderBy, where, transaction = null) {
        return this.findAndCountAll({
            where,
            include: [{ 
                model: InvoiceModel,
                attributes: [
                    "id",
                    "billingDocument",
                    "createdAt",
                    "billingType",
                    "documentCurrency",
                    "billToParty",
                    "billToPartyName",
                    "grossValue",
                    "netValue",
                    "referenceOrderDocument",
                    "taxAmount",
                    "roundingAdjustment"
                    
                ],
                include: [
                    { model: InvoiceItemModel,
                        attributes: [
                            "id",
                            "item",
                            "itemType",
                            "itemDescription",
                            "quantity",
                            "grossAmount",
                            "netPrice1",
                            "netPrice2",
                            "netPrice3",
                            "taxAmount",
                            "rounding"
                        ]
                    },
                    {
                        model: ServiceMaster.RepairOrder,
                        as: "repairOrder",
                        // attributes: [
                        //     'id','refNo','roCreationDate','repairOrderTypeId'
                        // ],
                        include: [{
                            model: ServiceMaster.RepairOrderType,
                            attributes: ['id', 'code', 'name']
                        }]
                    }
                ]
            }, { 
                model: AdjustmentActivityLogModel 
            }, {
                model: CustomerMaster.Branch,
                // attributes: ['id', 'code', 'name']
            }],
            ...pagination,
            order: [orderBy],
        }, transaction);
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
        if (!skipInclude) {
            include = [{ model: InvoiceModel }, { model: AdjustmentActivityLogModel }];
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
            include: [{ model: InvoiceModel }, { model: AdjustmentActivityLogModel }],
            attributes
        });
    }

    static addRecord(record, transaction = null) {
        return this.create(record, {
            returning: true
        }, transaction);
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
