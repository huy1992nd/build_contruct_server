const Sequelize = require("sequelize");
const schema = require('./schema');
var _ = require('lodash');

const tableName = "symptomCategory";
const modelName = "symptomCategory";
const Op = Sequelize.Op;
const Utils = require('../../../../utils/database.utils');

// const ModelWithPublisher = require('@driveit/publisher-lib').ModelWithPublisher;
module.exports = class SymptomCategory extends Sequelize.Model {

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

    static async getCodewithCategory(pagination, orderBy) {
        return new Promise(async (resolve, reject) => {
            const count = await this.count({
                where: {
                    'deleted': 0
                }
            });
            this.sequelize.query(`SELECT COUNT(*) AS COUNT FROM service_master.symptomCategory
            LEFT JOIN general_master.symptomCode AS symptomCode ON find_in_set(symptomCode.id,replace(replace(replace(symptomCodeIds,'[',''),']','' ),'"','' )) WHERE (symptomCode.deleted = 0  AND  service_master.symptomCategory.deleted  = 0)`, {
                type: this.sequelize.QueryTypes.SELECT
            }
            ).then(r => {
                console.log(r[0].COUNT);
                this.sequelize.query(`SELECT symptomCategory.name AS symptomCategory, symptomCode.name AS  symptomDescription, symptomCode.code AS symptomCode FROM service_master.symptomCategory
                LEFT JOIN general_master.symptomCode AS symptomCode ON find_in_set(symptomCode.id,replace(replace(replace(symptomCodeIds,'[',''),']','' ),'"','' )) WHERE (symptomCode.deleted = 0  AND  service_master.symptomCategory.deleted  = 0)
                LIMIT ?,?
                `, {
                    replacements: [pagination.offset, pagination.limit],
                    type: this.sequelize.QueryTypes.SELECT
                }).then(result => {
                    resolve({
                        result: result,
                        count: r[0].COUNT
                    })
                });
            })

        })

        // })
    }

}