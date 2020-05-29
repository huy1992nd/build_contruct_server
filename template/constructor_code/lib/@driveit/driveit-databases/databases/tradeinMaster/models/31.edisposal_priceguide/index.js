const Sequelize = require("sequelize");
const schema = require('./schema');
var _ = require('lodash');
const StatusEnum = require('../enums/Status');
const Utils = require('../../../../utils/database.utils');
const uv_file_upload = require('../10.uv_file_upload');
const uv_price_item = require('../05.uv_price_item');
const uv_route = require('../22.uv_route');
const tableName = "edisposal_priceguide";
const modelName = "edisposal_priceguide";
const Op = Sequelize.Op;

// const ModelWithPublisher = require('@driveit/publisher-lib').ModelWithPublisher;
module.exports = class Edisposal_priceguide extends Sequelize.Model {
    static associate(models) {
        this.myAssociation = this.belongsTo(models.uv_file_upload, {
            foreignKey: 'fileId',
            targetKey: 'id'
        });
        this.myAssociation = this.belongsTo(uv_price_item, {
            foreignKey: 'prcItemId',
            targetKey: 'id'
        });
        this.myAssociation = this.belongsTo(models.uv_route, {
            foreignKey: 'uvRouteId',
            targetKey: 'id'
        });
        this.myAssociation = this.belongsTo(models.uv_route, {
            foreignKey: 'routeCode',
            targetKey: 'code',
            constraints: false
        });
    }
    //schema
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
    static init(sequelize, databaseName) {
        return super.init(schema(), {
            tableName,
            modelName,
                schema: databaseName,
            sequelize
        });
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

        return this.findAndCountAll({
                where: {
                    ...where
                },
                include: [{
                        model: uv_file_upload,
                        attributes: ["id", "fileName", ["path", "fileUrl"], "isDocument"],
                        required: false
                    },
                    {
                        model: uv_price_item,
                        attributes: ["id", "code", "name"],
                        required: true
                    },
                    {
                        model: uv_route,
                        attributes: ["id", "code", "name"],
                        required: true
                    }
                ],
                ...pagination,
                order: [orderBy]
            })
            .then(priceguide => {
                const resObj = _.map(priceguide.rows, (pg) => {
                    return Object.assign({
                        id: pg.id,
                        edCycleId: pg.edCycleId,
                        prcItemId: pg.prcItemId,
                        value: this.getValueForPriceGuide(pg.inputType, pg),
                        fileInfo: pg.uv_file_upload,
                        prcItemCode: pg.uv_price_item.code,
                        seq: +pg.uv_route.code,
                    });
                });
                return {
                    rows: resObj
                };
            });
    }

    static getValueForPriceGuide(inputType, dataItem) {
        let value = null;
        switch (inputType) {
            case "text":
                value = dataItem.valtext;
                break;
            case "numeric":
                value = dataItem.valdecimal;
                break;
            case "date":
                value = dataItem.valdate;
                break;
        }

        return value;
    }
}