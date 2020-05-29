/*jshint esversion: 9 */
const Sequelize = require("sequelize");
const schema = require('./schema');
var _ = require('lodash');

const tableName = "vehicleTransfer";
const modelName = "vehicleTransfer";
const Op = Sequelize.Op;
const Utils = require('../../../../utils/database.utils');

const VehicleTransferAttachment = require('../50.vehicleTransferAttachment');
const VehicleTransferOptionalItem = require('../78.vehicleTransferOptionalItem');
const VehicleTransferCompulsoryPackageItem = require('../79.vehicleTransferCompulsoryPackageItem');
const VehicleTransferOptionalPackageItem = require('../80.vehicleTransferOptionalPackageItem');

const customerMaster = require('../../../customerMaster');

// const ModelWithPublisher = require('@driveit/publisher-lib').ModelWithPublisher;
module.exports = class vehicleTransfer extends Sequelize.Model {
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
        //not yet create master data
        this.myAssociation = this.hasMany(models.VehicleTransferAttachment, {
            foreignKey: 'vehicleTransferId'
        });
        this.myAssociation = this.hasMany(models.VehicleTransferOptionalItem, {
            foreignKey: 'vehicleTransferId'
        });
        this.myAssociation = this.hasMany(models.VehicleTransferCompulsoryPackageItem, {
            foreignKey: 'vehicleTransferId'
        });
        this.myAssociation = this.hasMany(models.VehicleTransferOptionalPackageItem, {
            foreignKey: 'vehicleTransferId'
        });

        if(!_.isEmpty(customerMaster)){
            this.myAssociation = this.hasOne(customerMaster.Company, {
                foreignKey: 'id',
                sourceKey: 'tenantCompanyId',
                as: 'tenantCompany'
            });
        }
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

    static getAll(where, transaction = null) {
        return this.findAll({
            where: {
                ...where,
                deleted: {
                    [Op.not]: true
                }
            }
        }, transaction);
    }


    static getRecords(pagination, orderBy, where, transaction = null) {
        return this.findAndCountAll({
            distinct: true,
            where: {
                ...where,
                deleted: {
                    [Op.not]: true
                }
            },
            include: [
                {
                    model: VehicleTransferAttachment
                },
                {
                    model: VehicleTransferCompulsoryPackageItem
                },
                {
                    model: VehicleTransferOptionalPackageItem
                },
                {
                    model: VehicleTransferOptionalItem
                },
                {
                    model: customerMaster.Company,
                    attributes: ['id', 'code', 'name'],
                    as: 'tenantCompany'
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
                qry[likeArrItem.colId] = { [Op.like]: likeArrItem.text };
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
};