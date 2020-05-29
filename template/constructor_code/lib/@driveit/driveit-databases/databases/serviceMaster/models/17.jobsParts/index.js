const Sequelize = require("sequelize");
const schema = require('./schema');
var _ = require('lodash');

const tableName = "jobsParts";
const modelName = "jobsParts";
const Op = Sequelize.Op;
const Utils = require('../../../../utils/database.utils');

const JobServiceModel = require('../36.jobServiceModel');
const JobCatalogModel = require('../33.jobCatalog');
const jobPartsModel = require('../37.jobPartsMaster');
// const Jobs = require('../16.jobs');

// const ModelWithPublisher = require('@driveit/publisher-lib').ModelWithPublisher;
module.exports = class JobsParts extends Sequelize.Model {

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
        this.myAssociation = this.belongsTo(models.Jobs, {foreignKey: 'jobsId'});
        // this.myAssociation = this.belongsTo(models.Parts, {foreignKey: 'partsId'});
        this.myAssociation = this.belongsTo(models.JobPartsMaster, {foreignKey: 'jobPartsMasterId'});
        this.myAssociation = this.belongsTo(models.JobServiceModel, {foreignKey: 'jobServiceModelId'});
        this.myAssociation = this.belongsTo(models.JobCatalog, {foreignKey: 'jobCatalogId'});
    }

    //methods
    static getOne(where, transaction = null) {
        return this.findOne({
            where,
        }, transaction);
    }

    static getAll(where, transaction = null) {
        return this.findAll({
            where,
        }, transaction);
    }


    static getRecords(pagination, orderBy, where, transaction = null) {
        return this.findAndCountAll({
            where,
            include: [
                { model: JobServiceModel },
                { model: jobPartsModel },
                { model: JobCatalogModel },                
                // { model: Jobs }
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

    static deleteSoft(where, who) {
        return this.update({
            deleted: true, updatedBy: who
        }, {
            where: where
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
        if (!skipInclude) {
            include = [
                { model: JobServiceModel },
                { model: jobPartsModel },
                { model: JobCatalogModel },
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