const Sequelize = require("sequelize");
const schema = require('./schema');
var _ = require('lodash');
const StatusEnum = require('../enums/Status');
const Utils = require('../../../../utils/database.utils');
const uv_route = require('../22.uv_route');
const edisposal_cycle = require('../36.edisposal_cycle');
const uv_price_channel = require('../06.uv_price_channel');
const tableName = "edisposal_route";
const modelName = "edisposal_route";
const Op = Sequelize.Op;

// const ModelWithPublisher = require('@driveit/publisher-lib').ModelWithPublisher;
module.exports = class Edisposal_route extends Sequelize.Model {
    static associate(models) {
        this.myAssociation = this.belongsTo(models.uv_route, {
            foreignKey: 'uvRouteId',
            targetKey: 'id'
        });
        this.myAssociation = this.belongsTo(models.edisposal_cycle, {
            foreignKey: 'edCycleId'
        });
        this.myAssociation = this.belongsTo(models.uv_price_channel , {
            foreignKey: 'prcChannelId'
        });
        this.myAssociation = this.belongsTo(models.uv_price_item , {
            foreignKey: 'prcPriceItemId'
        });
        this.myAssociation = this.hasMany(models.edisposal_priceguide, {
            foreignKey: 'edRouteId',
            sourceKey: 'id'
        });
        this.myAssociation = this.hasMany(models.edisposal_proposal , {
            foreignKey: 'edRouteId',
            sourceKey: 'id'
        });
        this.myAssociation = this.hasMany(models.edisposal_emailrecipient , {
            foreignKey: 'edRouteId',
            sourceKey: 'id'
        });
    }
    //schema
    static init(sequelize, databaseName) {
        return super.init(schema(), {
            tableName,
            modelName,
                schema: databaseName,
            sequelize
        });
    }

    static getAll(where, transaction = null) {
        return this.findAll({
                where
            },
            transaction
        );
    }

    static getRecords(pagination, orderBy, where, transaction = null) {
        return this.findAndCountAll({
                where,
                ...pagination,
                order: [orderBy]
            },
            transaction
        );
    }

    static updateRecord(record, where, transaction = null) {
        return this.update(
            record, {
                where,
                isNewRecord: false
            },
            transaction
        );
    }

    static deleteRecord(where, transaction = null) {
        return this.destroy({
                where: where
            },
            transaction
        );
    }
    static addRecord(record, transaction = null) {
        return this.create(record, {
            returning: true
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
    
        return this.findAndCountAll({
            where: {
                ...where,
                deleted: {
                    [Op.not]: true
                }
            },
            include: [{
                model: uv_route,
                attributes: ['id', 'code', 'name', 'isUpdProposal']
            },
            {
                model: edisposal_cycle,
                attributes: ['id', 'cycleno', 'nettradeinvalue']
            },
            {
                model: uv_price_channel,
                attributes: ['id', 'name'],
                required: false
            }
        ],
            ...pagination,
            attributes: attribute,
            order: [orderBy]
        });

    }

    static getOne(where, transaction = null) {
        return this.findOne({
            where
        }, transaction);
    }

}