const Sequelize = require("sequelize");
const schema = require('./schema');
var _ = require('lodash');

const tableName = "jobs";
const modelName = "jobs";
const Op = Sequelize.Op;
const Utils = require('../../../../utils/database.utils');

const JobsParts = require('../17.jobsParts');
// const Parts = require('../05.parts');
// const PartGroup = require('../15.partGroup');
const JobClass = require('../06.jobClass');
const JobCatalog = require('../33.jobCatalog');
const JobType = require('../04.jobType');
const JobServiceModel = require('../36.jobServiceModel');
const JobPartsMaster = require('../37.jobPartsMaster');
const JobGroup = require('../34.jobGroup');

// const ModelWithPublisher = require('@driveit/publisher-lib').ModelWithPublisher;
module.exports = class Jobs extends Sequelize.Model {

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
        this.myAssociation = this.belongsTo(models.JobClass, {
            foreignKey: 'jobClassId',
            targetKey: 'id'
        });

        this.myAssociation = this.hasMany(models.JobsParts, {
            foreignKey: 'jobsId',
            sourceKey: 'id'
        }, { 
            onDelete: 'CASCADE'
        });

        this.myAssociation = this.belongsTo(models.JobGroup, {
            foreignKey: 'jobGroupId',
            targetKey: 'id'
        });
        this.myAssociation = this.belongsTo(models.JobType, {
            foreignKey: 'jobTypeId',
            targetKey: 'id'
        });
        this.myAssociation = this.belongsTo(models.JobCatalog, {
            foreignKey: 'jobCatalogId'
        });
        
        this.myAssociation = this.hasMany(models.JobServiceModel, {
            foreignKey: 'jobId',
            sourceKey: 'id'
        });
        this.myAssociation = this.hasMany(models.ServiceJobPart, {
            foreignKey: 'jobId',
            sourceKey: 'id'
            
        });
        
        this.myAssociation = this.belongsTo(models.ServicePackage, {
            foreignKey: 'servicePackageId',
            targetKey: 'id'
        });
    }

    //methods
    static getOne(where, transaction = null) {
        return this.findOne({
            where,
        }, transaction);
    }

    static getAll(where, transaction = null) {
        return this.findAll({
            where
        }, transaction);
    }


    static getRecords(pagination, orderBy, where, transaction = null, whereJobClass = null) {
        return this.findAndCountAll({
            where,
            include: [{
                order: [orderBy],
                model: JobsParts,
                include: [
                    // { model: Parts,
                    //     include: [  {model: PartGroup}]
                    // },
                    {
                        model: JobCatalog
                    },{
                        model: JobServiceModel
                    },{
                        model: JobPartsMaster
                    }]
            },
            { 
                model: JobClass,
                where: whereJobClass
            },
            { model: JobCatalog}, {
                model: JobType
            },{
                model: JobServiceModel
            },
            {model: JobGroup}
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

    static deleteHard(where) {
        return this.destroy({
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
                { model: JobsParts, include: [{model: JobCatalog},{model: JobServiceModel},{model: JobPartsMaster}] },
                { model: JobClass },
                { model: JobCatalog },
                { model: JobType },
                { model: JobServiceModel },
                { model: JobGroup }
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