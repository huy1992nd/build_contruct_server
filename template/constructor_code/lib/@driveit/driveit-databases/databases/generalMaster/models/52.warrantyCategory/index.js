/*jshint esversion: 9 */
const Sequelize = require("sequelize");
const schema = require('./schema');
var _ = require('lodash');

const tableName = "warrantyCategory";
const modelName = "warrantyCategory";
const Utils = require('../../../../utils/database.utils');
const Op = Sequelize.Op;

const uom = require("../../models/16.uom")
// const ModelWithPublisher = require('@driveit/publisher-lib').ModelWithPublisher;
module.exports = class WarrantyCategory extends Sequelize.Model {
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
        this.myAssociation = this.belongsTo(models.Uom, {
            foreignKey: 'UoM',
            targetKey: 'id'
        });
        this.myAssociation = this.belongsTo(models.Uom, {
            foreignKey: 'UoMMileageId',
            targetKey: 'id',
            as: 'uomMileage'
        });

        // this.myAssociation = this.hasMany(models.WarrantyClaimCategoryType, {
        //     foreignKey: 'warrantyCategoryClaimTypeId', 
        //     sourceKey: 'id'
        // })
    }

    //methods
    static getOne(where, transaction = null) {
        return this.findOne({
            where
        }, transaction);
    }

    static getAll(where, transaction = null) {
        return this.findAll({
            where
        }, transaction);
    }

    static searchAll(likeArr = [], attributes = null, pagination, orderBy, filterArr = [], skipInclude = false) {
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
            include = [];
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

    static getRecords(pagination, orderBy, where, transaction = null) {
        return this.findAndCountAll({
            where,
            include: [
                { model: uom },
                { model: uom,
                    as: 'uomMileage'
                },
            ],
            ...pagination,
            order: [orderBy],
        }, transaction);
    }

    static addRecord(record, transaction = null) {
        return this.create(record, {
            returning: true
        }, transaction);

    }

    static addNew(obj, transaction) {
        return this.create(
            obj, {
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