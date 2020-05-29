const Sequelize = require("sequelize");
const schema = require('./schema');
var _ = require('lodash');

const tableName = "invoiceHeader";
const modelName = "invoiceHeader";
const Op = Sequelize.Op;
const Utils = require('../../../../utils/database.utils');

const InvoiceItemModel = require('../84.invoiceItem');
const ServiceMaster = require('../../../serviceMaster');

const ModelWithPublisher = require('@driveit/publisher-lib').ModelWithPublisher;
module.exports = class InvoiceHeader extends ModelWithPublisher {

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
        this.myAssociation = this.hasMany(models.InvoiceItem, {
            foreignKey: 'invoiceHeaderId',
            sourceKey: 'id'
        }, {
            onDelete: 'CASCADE'
        });
        if(!_.isEmpty(ServiceMaster)) {
            this.myAssociation = this.hasOne(ServiceMaster.RepairOrder, {
                foreignKey: 'refNo',
                sourceKey: 'referenceOrderDocument',
                as: "repairOrder"
            });
        }
    }

    //methods
    static getOne(where, transaction = null) {
        return this.findOne({
            where,
            include: [
                { model: InvoiceItemModel }
            ]
        }, transaction);
    }

    static getAll(where, transaction = null) {
        return this.findAll({
            where,
            include: [
                { model: InvoiceItemModel }
            ]
        }, transaction);
    }

    static getRecords(pagination, orderBy, where, transaction = null) {
        return this.findAndCountAll({
            where,
            include: [
                { model: InvoiceItemModel},
                {
                    model: ServiceMaster.RepairOrder,
                    as: "repairOrder",
                    attributes: [
                        'id','refNo','roCreationDate','repairOrderTypeId'
                    ],
                    include: [
                        { model: ServiceMaster.RepairOrderType,
                        attributes: ['id', 'code', 'name'] }
                    ]
                }
            ],
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
            include = [
                { model: InvoiceItemModel }
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
