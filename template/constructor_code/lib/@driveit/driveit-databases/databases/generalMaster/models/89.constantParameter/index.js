const Sequelize = require("sequelize");
const schema = require('./schema');
var _ = require('lodash');

const tableName = "constantParameter";
const modelName = "constantParameter";
const Op = Sequelize.Op;
const Utils = require('../../../../utils/database.utils');


const moment = require('moment');
const errorCode = require('../../../../utils/error.codes');

// const ModelWithPublisher = require('publisher-lib').ModelWithPublisher;
module.exports = class ConstantParameter extends Sequelize.Model {

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
        // this.myAssociation = this.hasMany(DocumentBranchSeries, {
        //     foreignKey: 'documentBranchSeriesId',
        //     sourceKey: 'id'
        // });

        // this.myAssociation = this.hasOne(Country,{
        //     foreignKey: 'id',
        //     sourceKey:'countryId'
        // })
        // this.myAssociation = this.hasOne(Company,{
        //     foreignKey: 'id',
        //     sourceKey:'companyId'
        // })

        // this.myAssociation = this.belongsTo(Country, {
        //     foreignKey: 'countryId',
        //     sourceKey: 'id'
        // });

        /*  this.myAssociation = this.hasMany(models.Model, {
             foreignKey: 'contactRelationshipId',
             sourceKey: 'id'
         }, {
             onDelete: 'CASCADE'
         }); */
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

    static getRecords(pagination, orderBy, where, transaction = null) {
        return this.findAndCountAll({
            where,
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

    static addRecord(record, transaction = null) {
        return this.create(record, {
            returning: true
        }, transaction);
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