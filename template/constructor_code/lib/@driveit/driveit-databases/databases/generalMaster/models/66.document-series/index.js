const Sequelize = require("sequelize");
const schema = require('./schema');
var _ = require('lodash');

const tableName = "documentSeries";
const modelName = "documentSeries";
const Op = Sequelize.Op;
const Utils = require('../../../../utils/database.utils');

const DocumentBranchSeries = require('../67.document-branch-series');

const moment = require('moment');
const errorCode = require('../../../../utils/error.codes');

// const ModelWithPublisher = require('publisher-lib').ModelWithPublisher;
module.exports = class DocumentSeries extends Sequelize.Model {

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
        this.myAssociation = this.hasMany(DocumentBranchSeries, {
            foreignKey: 'documentBranchSeriesId',
            sourceKey: 'id'
        });

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

    static getBranchCodeByID(id) {
        return this.sequelize.query(`SELECT code FROM customer_master.branch WHERE id = ? AND deleted = 0`, {
            replacements: [id], type: Sequelize.QueryTypes.SELECT
        });
    }

    static getCountryCodeByID(id) {
        return this.sequelize.query(`SELECT code FROM general_master.country WHERE id = ? AND deleted = 0`, {
            replacements: [id], type: Sequelize.QueryTypes.SELECT
        });
    }

    /**
     * Generate the RO number
     */
    static genRepirOrderId(branchId, repairOrderTypeCode) {
        return new Promise(async (resolve, reject) => {
            let docSeries = await this.sequelize.query(`SELECT documentSeries.id,docKey,startNumber,yearSuffix,resetPerYr,docLastNum,company.code AS companyCode,branch.code AS branchCode
                FROM general_master.documentSeries AS documentSeries
                LEFT JOIN general_master.country as country ON country.id = documentSeries.countryId AND country.deleted = 0
                LEFT JOIN customer_master.company as company ON company.id =  documentSeries.companyId AND company.deleted = 0
                LEFT JOIN general_master.documentType as documentType ON documentType.id = documentSeries.docType AND documentType.deleted = 0
                LEFT JOIN general_master.documentBranchSeries AS documentBranchSeries ON documentBranchSeries.documentSeriesId = documentSeries.id AND documentBranchSeries.deleted = 0
                LEFT JOIN customer_master.branch as branch ON branch.id =  documentBranchSeries.branchId AND branch.deleted = 0
                WHERE  documentSeries.deleted = 0 
                AND documentBranchSeries.branchId = ?
                AND documentType.code = ?
                `, {
                replacements: [
                    branchId,
                    repairOrderTypeCode
                ],
                type: this.sequelize.QueryTypes.SELECT
            })
            // console.log(docSeries);
            if (docSeries.length > 0) {
                docSeries = docSeries[0];
                let genNextNumber = ++docSeries.docLastNum;
                // Checking if YY is to be added or not
                const yearStr = (docSeries.yearSuffix === 'X') ? moment().format('YY') : '';

                // Checking if needs to reset
                const newYearDate = '01-01';
                if ((moment().format('MM-DD') === newYearDate) && docSeries.resetPerYr === 'X') {
                    genNextNumber = 1;
                }

                const createDocNumSer = docSeries.branchCode + docSeries.docKey + yearStr + this.pad(genNextNumber, 7);

                // if (!data.preview) {
                await this.updateRecord({ docLastNum: genNextNumber }, { id: docSeries.id })
                // }
                resolve({ nextNum: createDocNumSer });

            } else {
                reject(errorCode.BRANCH_NOT_FOUND)
            }
        });
    }

    /**
     * Generate the Document Number with param countryId,companyId,branchId and docType
     */
    static genDocNumer(countryId, companyId, branchId, docType) {
        return new Promise(async (resolve, reject) => {
            let docSeries = await this.sequelize.query(`SELECT documentSeries.id,docKey,startNumber,yearSuffix,resetPerYr,docLastNum,company.code AS companyCode,branch.code AS branchCode
            FROM general_master.documentSeries AS documentSeries
            LEFT JOIN general_master.country as country ON country.id = documentSeries.countryId AND country.deleted = 0
            LEFT JOIN customer_master.company as company ON company.id =  documentSeries.companyId AND company.deleted = 0
            LEFT JOIN general_master.documentType as documentType ON documentType.id = documentSeries.docType AND documentType.deleted = 0
            LEFT JOIN general_master.documentBranchSeries AS documentBranchSeries ON documentBranchSeries.documentSeriesId = documentSeries.id AND documentBranchSeries.deleted = 0
            LEFT JOIN customer_master.branch as branch ON branch.id =  documentBranchSeries.branchId AND branch.deleted = 0
            WHERE  documentSeries.deleted = 0 
            AND documentSeries.countryId = ?
            AND documentSeries.companyId = ? 
            AND documentBranchSeries.branchId = ?
            AND documentType.code = ?`, {
                replacements: [
                    countryId,
                    companyId,
                    branchId,
                    docType
                ],
                type: this.sequelize.QueryTypes.SELECT
            })
            // console.log(docSeries);
            if (docSeries.length > 0) {
                docSeries = docSeries[0];
                let genNextNumber = ++docSeries.docLastNum;
                // Checking if YY is to be added or not
                const yearStr = (docSeries.yearSuffix === 'X') ? moment().format('YY') : '';

                // Checking if needs to reset
                const newYearDate = '01-01';
                if ((moment().format('MM-DD') === newYearDate) && docSeries.resetPerYr === 'X') {
                    genNextNumber = 1;
                }

                const createDocNumSer = docSeries.branchCode + docSeries.docKey + yearStr + this.pad(genNextNumber, 7);

                // if (!data.preview) {
                await this.updateRecord({ docLastNum: genNextNumber }, { id: docSeries.id })
                // }
                resolve({ nextNum: createDocNumSer });

            } else {
                reject(errorCode.BRANCH_NOT_FOUND)
            }
        })
    }

    static genDocNumerByBranchId(branchId, docType) {
        return new Promise(async (resolve, reject) => {
            let docSeries = await this.sequelize.query(`SELECT documentSeries.id,docKey,startNumber,yearSuffix,resetPerYr,docLastNum,company.code AS companyCode,branch.code AS branchCode
                FROM general_master.documentSeries AS documentSeries
                LEFT JOIN general_master.country as country ON country.id = documentSeries.countryId AND country.deleted = 0
                LEFT JOIN customer_master.company as company ON company.id =  documentSeries.companyId AND company.deleted = 0
                LEFT JOIN general_master.documentType as documentType ON documentType.id = documentSeries.docType AND documentType.deleted = 0
                LEFT JOIN general_master.documentBranchSeries AS documentBranchSeries ON documentBranchSeries.documentSeriesId = documentSeries.id AND documentBranchSeries.deleted = 0
                LEFT JOIN customer_master.branch as branch ON branch.id =  documentBranchSeries.branchId AND branch.deleted = 0
                WHERE  documentSeries.deleted = 0 
                AND documentBranchSeries.branchId = ?
                AND documentType.code = ?
                `, {
                replacements: [
                    branchId,
                    docType
                ],
                type: this.sequelize.QueryTypes.SELECT
            })
            // console.log(docSeries);
            if (docSeries.length > 0) {
                docSeries = docSeries[0];
                let genNextNumber = ++docSeries.docLastNum;
                // Checking if YY is to be added or not
                const yearStr = (docSeries.yearSuffix === 'X') ? moment().format('YY') : '';

                // Checking if needs to reset
                const newYearDate = '01-01';
                if ((moment().format('MM-DD') === newYearDate) && docSeries.resetPerYr === 'X') {
                    genNextNumber = 1;
                }

                const createDocNumSer = docSeries.branchCode + docSeries.docKey + yearStr + this.pad(genNextNumber, 7);

                // if (!data.preview) {
                await this.updateRecord({ docLastNum: genNextNumber }, { id: docSeries.id })
                // }
                resolve({ nextNum: createDocNumSer });

            } else {
                reject(errorCode.BRANCH_NOT_FOUND)
            }
        });
    }

    static genDocNumerByCompanyId(branchId, docType) {
        return new Promise(async (resolve, reject) => {
            let docSeries = await this.sequelize.query(`SELECT documentSeries.id,docKey,startNumber,yearSuffix,resetPerYr,docLastNum,company.code AS companyCode
            FROM general_master.documentSeries AS documentSeries
            LEFT JOIN general_master.country as country ON country.id = documentSeries.countryId AND country.deleted = 0
            LEFT JOIN customer_master.company as company ON company.id =  documentSeries.companyId AND company.deleted = 0
            LEFT JOIN general_master.documentType as documentType ON documentType.id = documentSeries.docType AND documentType.deleted = 0
            
            WHERE  documentSeries.deleted = 0 
            AND documentSeries.companyId = ?
            AND documentType.code = ?
                `, {
                replacements: [
                    branchId,
                    docType
                ],
                type: this.sequelize.QueryTypes.SELECT
            })
            // console.log(docSeries);
            if (docSeries.length > 0) {
                docSeries = docSeries[0];
                let genNextNumber = ++docSeries.docLastNum;
                // Checking if YY is to be added or not
                const yearStr = (docSeries.yearSuffix === 'X') ? moment().format('YY') : '';

                // Checking if needs to reset
                const newYearDate = '01-01';
                if ((moment().format('MM-DD') === newYearDate) && docSeries.resetPerYr === 'X') {
                    genNextNumber = 1;
                }

                const createDocNumSer = docSeries.companyCode + docSeries.docKey + yearStr + this.pad(genNextNumber, 7);

                // if (!data.preview) {
                await this.updateRecord({ docLastNum: genNextNumber }, { id: docSeries.id })
                // }
                resolve({ nextNum: createDocNumSer });

            } else {
                reject(errorCode.BRANCH_NOT_FOUND)
            }
        });
    }

    static pad(num, size) {
        var s = num + "";
        while (s.length < size) s = "0" + s;
        return s;
    }

}