const Sequelize = require("sequelize");
const schema = require('./schema');
var _ = require('lodash');
const StatusEnum = require('../enums/Status');
const Utils = require('../../../../utils/database.utils');
const uv_specification = require('../09.uv_specification');

const tableName = "echecklist_spec";
const modelName = "echecklist_spec";
const Op = Sequelize.Op;

// const ModelWithPublisher = require('@driveit/publisher-lib').ModelWithPublisher;
module.exports = class Echecklist_spec extends Sequelize.Model {

    //schema
    static init(sequelize, databaseName) {
        return super.init(schema(), {
            tableName,
            modelName,
            schema: databaseName,
            sequelize
        });
    }

    static associate(models) {
        this.myAssociation = this.belongsTo(models.echecklists, {
            foreignKey: 'echeckListId',
            targetKey:'id'
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
            where
        }, transaction);
    }

    static getRecords(pagination, attribute = [], orderBy, where, transaction = null) {
        return this.findAndCountAll({
            where,
            ...pagination,
            //attributes: attribute,
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

    static searchAll(likeArr = [], attribute = [], pagination, orderBy, filterArr = []) {
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

        return uv_specification.findAndCountAll({
            attributes: ['id',
                'code',
                'name',
            ],
            where: {
                deleted: {
                    [Op.not]: true
                }
            },
            include: [{
                model: this,
                required: false,
                attributes: ['echeckListId', 'uvSpecId'],
                where: {
                    ...where,
                    deleted: {
                        [Op.not]: true
                    }
                },
            }],
            ...pagination,
            order: [orderBy]
        }).then(echecklist_spec => {
            const resObj = _.map(echecklist_spec.rows, (spec) => {
                return Object.assign({
                    uvSpecId: spec.id,
                    code: spec.code,
                    name: spec.name,
                    value: (spec.echecklist_specs.length > 0)
                });
            });
            return {
                rows: resObj
            };
        });
    }
}