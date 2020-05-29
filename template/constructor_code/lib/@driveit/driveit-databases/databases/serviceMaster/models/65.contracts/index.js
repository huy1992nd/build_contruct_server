const Sequelize = require("sequelize");
const schema = require('./schema');
var _ = require('lodash');

const tableName = "contracts";
const modelName = "contracts";
const Op = Sequelize.Op;
const Utils = require('../../../../utils/database.utils');

const ContractRates = require('../67.contractRates');
const Vehiclecontracts = require('../66.vehicleContracts');
const ContractType = require('../68.contractType');
const ContractUpload = require('../79.contractUpload');

// const ModelWithPublisher = require('@driveit/publisher-lib').ModelWithPublisher;
module.exports = class Contracts extends Sequelize.Model {

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
        this.myAssociation = this.belongsTo(models.ContractType, {
            foreignKey: 'contractTypeId',
            targetKey: 'id'
        });
        this.myAssociation = this.hasMany(models.VehicleContract, {
            foreignKey: 'contractId',
            sourceKey: 'id'
        });
        this.myAssociation = this.hasMany(models.ContractUpload, {
            foreignKey: 'contractId',
        });
        this.myAssociation = this.hasMany(models.ContractInvoice, {
            foreignKey: 'contractId',
            sourceKey: 'id'
        });
    }

    //methods
    static getOne(where, transaction = null) {
        return this.findOne({
            where
        }, transaction);
    }

    static getAll(where, transaction = null) {
        return this.findAll({
            include: [
                { model: ContractType }
            ],
            where
        }, transaction);
    }

    static getAllWithIncludes(pagination, orderBy, where, includes) {
        return this.findAndCountAll({
            where,
            include: includes,
            distinct: true,
            ...pagination,
            order: [orderBy],
        });
    }

    static getRecords(pagination, orderBy, where, transaction = null) {
        return this.findAndCountAll({
            where,
            include: [
                {
                    model: Vehiclecontracts,
                    where: {
                        deleted: 0
                    },
                    include: [
                        {
                            model: ContractRates,
                            where: {
                                deleted: 0
                            }
                        }
                    ]
                },
                {
                    model: ContractType,
                    where: {
                        deleted: 0
                    }
                },
                {
                    model: ContractUpload,
                    where: {
                        deleted: 0
                    }
                }
            ],
            distinct: true,
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
                {
                    model: Vehiclecontracts,
                    where: { deleted: 0 },
                    include: [{
                            model: ContractRates,
                            where: { deleted: 0 }
                    }]
                },
                {
                    model: ContractType,
                    where: { deleted: 0 }
                },
                {
                    model: ContractUpload,
                    where: { deleted: 0 }
                }
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