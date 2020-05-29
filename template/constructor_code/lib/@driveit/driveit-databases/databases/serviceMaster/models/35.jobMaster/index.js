const Sequelize = require("sequelize");
const schema = require('./schema');
var _ = require('lodash');

const tableName = "jobMaster";
const modelName = "jobMaster";
const Op = Sequelize.Op;
const Utils = require('../../../../utils/database.utils');

const JobCatalog = require('./../33.jobCatalog');
const Jobs = require('./../16.jobs');

// const ModelWithPublisher = require('@driveit/publisher-lib').ModelWithPublisher;
module.exports = class jobMaster extends Sequelize.Model {

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
        this.myAssociation = this.belongsTo(models.JobCatalog, {
            foreignKey: 'jobCatalogId',
        });
        this.myAssociation = this.belongsTo(models.Jobs, {
            foreignKey: 'jobId',
        });
    }

    //methods
    static getOne(where, transaction = null) {
        return this.findOne({
            where,
            include: [{
                model: JobCatalog
            }, {
                model: Jobs
            }]
        }, transaction);
    }

    static getAll(where, transaction = null) {
        return this.findAll({
            where,
            include: [{
                model: JobCatalog
            }, {
                model: Jobs
            }]
        }, transaction);
    }


    static getRecords(pagination, orderBy, where, transaction = null) {
        return this.findAndCountAll({
            where,
            include: [{
                model: JobCatalog
            }, {
                model: Jobs
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
            include = [
                { model: JobCatalog },
                { model: Jobs }
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