const Sequelize = require("sequelize");
const schema = require('./schema');
var _ = require('lodash');

const tableName = "warrantyApproval";
const modelName = "warrantyApproval";
const Op = Sequelize.Op;
const Utils = require('../../../../utils/database.utils');

const jobTypeModel = require('../04.jobType');
const jobClassModel = require('../06.jobClass');
const jobsModel = require('../16.jobs');
const jobsPartsModel = require('../17.jobsParts');
const servicePackageModel = require('../38.servicePackage');
const bayMasterModel = require('../42.bayMaster');
const symptomCategoryModel = require('../53.symptomCategory');
const warrantyClaimCategoryModel = require('../58.warrantyClaimCategory');
const subletCodeModel = require('../59.subletCode');
const warrantyClaimTypeModel = require('../60.warrantyClaimType');
const warrantyApprovalPartsModel = require('../84.warrantyApprovalParts');
const warrantyApprovalJobsModel = require('../81.warrantyApprovalJobs');
const warrantyApprovalIncidentModel = require('../82.warrantyApprovalIncident');
const warrantyApprovalStatusModel = require('../83.warrantyApprovalStatus');
const warrantyCategoryModel = require('../../../generalMaster/models/52.warrantyCategory');

module.exports = class WarrantyApproval extends Sequelize.Model {

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
        this.myAssociation = this.hasOne(models.WarrantyApprovalIncident, {
            foreignKey: 'warrantyApprovalId'
        });
        this.myAssociation = this.hasMany(models.WarrantyApprovalStatus, {
            foreignKey: 'warrantyApprovalId'
        });
    }

    //methods
    static getAll(where, transaction = null) {
        return this.findAll({
            where
        }, transaction);
    }

    static getRecords(pagination, orderBy, where, subWhere, transaction = null) {
        return this.findAndCountAll({
            ...pagination,
            order: [orderBy],
            include: [{
                model: warrantyApprovalIncidentModel,
                where: subWhere,
                include: [{
                    model: warrantyClaimCategoryModel,
                    attributes: ['id', 'code', 'name']
                },{
                    model: warrantyCategoryModel,
                    attributes: ['id', 'code', 'name']
                }, {
                    model: warrantyCategoryModel,
                    attributes: ['id', 'code', 'name']
                },
                {
                    model: warrantyClaimTypeModel,
                    attributes: ['id', 'code', 'name', 'warrantyClaimCategoryIds']
                }, {
                    model: symptomCategoryModel,
                    attributes: ['id', 'code', 'name', 'symptomCodeIds']
                }, {
                    model: warrantyApprovalPartsModel,
                    where: { deleted: false },
                    required: false,
                    include: [{
                        model: jobsModel,
                        attributes: ['id', 'code', 'name', 'uomId', 'hours', 'amount', 'materialId', 'poGeneration', 'status', 'jobGroupId', 'jobClassId', 'jobTypeId', 'jobCatalogId', 'servicePackageId']
                    }, {
                        model: servicePackageModel,
                        attributes: ['id', 'code', 'name']
                    }, {
                        model: jobsPartsModel,
                        attributes: ['id', 'status', 'materialId', 'materialDesc', 'uomId', 'quantity', 'jobsId']
                    }]
                }, {
                    model: warrantyApprovalJobsModel,
                    where: { deleted: false },
                    required: false,
                    include: [{
                        model: subletCodeModel,
                        attributes: ['id', 'subletCategory', 'code', 'status']
                    }, {
                        model: jobsModel,
                        attributes: ['id', 'code', 'name', 'uomId', 'hours', 'amount', 'materialId']
                    }, {
                        model: jobClassModel,
                        attributes: ['id', 'code', 'name']
                    }, {
                        model: jobTypeModel,
                        attributes: ['id', 'code', 'name']
                    }, {
                        model: bayMasterModel,
                        attributes: ['id', 'code', 'name', 'branchId', 'bayTypeId']
                    }]
                }]
            }, {
                model: warrantyApprovalStatusModel,
                required: false,
                attributes: ['id', 'warrantyApprovalId', 'status', 'remarks', 'updatedBy', 'updatedName', 'updatedAt']
            }],
            where: {
                ...where
            },
            distinct: true,
            col: 'id'
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
            include = [{
                model: warrantyApprovalIncidentModel,
                where: subWhere,
                include: [{
                    model: warrantyClaimCategoryModel,
                    attributes: ['id', 'code', 'name']
                }, {
                    model: warrantyClaimTypeModel,
                    attributes: ['id', 'code', 'name', 'warrantyClaimCategoryIds']
                }, {
                    model: symptomCategoryModel,
                    attributes: ['id', 'code', 'name', 'symptomCodeIds']
                }, {
                    model: warrantyApprovalPartsModel,
                    where: { deleted: false },
                    required: false,
                    include: [{
                        model: jobsModel,
                        attributes: ['id', 'code', 'name', 'uomId', 'hours', 'amount', 'materialId', 'poGeneration', 'status', 'jobGroupId', 'jobClassId', 'jobTypeId', 'jobCatalogId', 'servicePackageId']
                    }, {
                        model: servicePackageModel,
                        attributes: ['id', 'code', 'name']
                    }, {
                        model: jobsPartsModel,
                        attributes: ['id', 'status', 'materialId', 'materialDesc', 'uomId', 'quantity', 'jobsId']
                    }]
                }, {
                    model: warrantyApprovalJobsModel,
                    where: { deleted: false },
                    required: false,
                    include: [{
                        model: subletCodeModel,
                        attributes: ['id', 'subletCategory', 'code', 'status']
                    }, {
                        model: jobsModel,
                        attributes: ['id', 'code', 'name', 'uomId', 'hours', 'amount', 'materialId']
                    }, {
                        model: jobClassModel,
                        attributes: ['id', 'code', 'name']
                    }, {
                        model: jobTypeModel,
                        attributes: ['id', 'code', 'name']
                    }, {
                        model: bayMasterModel,
                        attributes: ['id', 'code', 'name', 'branchId', 'bayTypeId']
                    }]
                }]
            }, {
                model: warrantyApprovalStatusModel,
                required: false,
                attributes: ['id', 'warrantyApprovalId', 'status', 'remarks', 'updatedBy', 'updatedName', 'updatedAt']
            }];
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
            returning: true,
        }, transaction);;
    }

    static updateRecord(record, where, transaction = null) {
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

}