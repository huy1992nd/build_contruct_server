const Sequelize = require('sequelize');
const schema = require('./schema');
var _ = require('lodash');
const echecklists = require('../11.echecklists');
const uv_route = require('../22.uv_route');
const echecklist_inspection = require('../14.echecklist_inspection');
const uv_status = require('../07.uv_status');
const Utils = require('../../../../utils/database.utils');
const edisposal_proposal = require('../32.edisposal_proposal');
const edisposal_cycle = require('../36.edisposal_cycle');
const edisposal_route = require('../29.edisposal_route');
const uv_price_item = require('../05.uv_price_item');
const uv_price_channel = require('../06.uv_price_channel');
const uv_condition = require('../02.uv_condition');
const edisposal_priceguide = require('../31.edisposal_priceguide');
const tableName = 'edisposals';
const modelName = 'edisposals';
const Op = Sequelize.Op;

// const ModelWithPublisher = require('@driveit/publisher-lib').ModelWithPublisher;
module.exports = class Edisposals extends Sequelize.Model {
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
        this.myAssociation = this.belongsTo(models.uv_route, {
            foreignKey: 'uvRouteId',
            targetKey: 'id'
        });
        this.myAssociation = this.belongsTo(models.echecklists, {
            foreignKey: 'echeckListId',
            targetKey:'id'
        });
        this.myAssociation = this.hasMany(models.edisposal_log, {
            foreignKey: 'edisposalId'
        });
        this.myAssociation = this.belongsTo(models.edisposal_cycle, {
            foreignKey: 'lastCycleId'
        });

        this.myAssociation = this.belongsTo(models.uv_condition, {
            foreignKey: 'overallCondId',
            targetKey: 'id'
        });
      /*   this.myAssociation = this.belongsTo(models.uv_condition, {
            foreignKey: 'overallCondId',
            targetKey: 'id'
        }); */
        this.myAssociation = this.belongsTo(models.edisposal_route, {
            foreignKey: 'lastRouteIdDP',
            targetKey: 'id'
        });
        
        this.myAssociation = this.belongsTo(models.uv_route, {
            foreignKey: 'prevUVRouteId',
            targetKey: 'id',
            as: 'uv_route_prev'
        });
    }

    static searchAll(likeArr = [], attribute = [], pagination, orderBy, filterArr = []) {
        let prepQry = [];
        let where = {};
        let extraWhereCondition = [];
        let uvrouteCondition = [];
        if (likeArr.length > 0) {
            _.forEach(likeArr, likeArrItem => {
                let qry = {};
                if (likeArrItem.colId.indexOf('echecklist') === -1 && likeArrItem.colId.indexOf('uv_route') === -1) {
                    qry[likeArrItem.colId] = {
                        [Op.like]: likeArrItem.text
                    };
                    prepQry.push(qry);
                }
                if (likeArrItem.colId.indexOf('echecklist') !== -1) {
                    qry[likeArrItem.colId.replace('echecklist.', '')] = {
                        [Op.like]: likeArrItem.text
                    };
                    extraWhereCondition.push(qry);
                }
                if (likeArrItem.colId.indexOf('uv_route') !== -1) {
                    qry[likeArrItem.colId.replace('uv_route.', '')] = {
                        [Op.like]: likeArrItem.text
                    };
                    uvrouteCondition.push(qry);
                }

            });
            if (prepQry.length > 0) {
                where = {
                    [Op.or]: prepQry
                };
            }

        }

        let arrFilter = Utils.filterGenerator(filterArr);

        if (arrFilter.length > 0) {
            _.forEach(arrFilter, val => {
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
                    attributes: ['id', 'code', 'name', 'isUpdProposal'],
                    where: uvrouteCondition
                },
                {
                    model: echecklists,
                    attributes: ['bookingno','registrationno', 'custidno', 'custfullname', 'vehicleBookingId','modeldescription','modelgroupcode','modelgroupname',
                    'customerAskPrc', 'capInitial', 'estRepairCost', 'offerPrc','bookingdate','nvinvoicedate','salespersoncode',
                    'salespersonname','refNo'],
                    where: extraWhereCondition,
                    include: [{
                        model: echecklist_inspection,
                        required: false,
                        attributes: ['updatedAt','lastOfferPrcAt']
                    }]
                },
                {
                    model: edisposal_cycle,
                    attributes: ['cycleNo']
                }
            ],
            ...pagination,
            attributes: attribute,
            order: [orderBy]
        });
    }
    static getProposedSellingPrice(echeckListId){
        let where = {'echeckListId': echeckListId};
        return this.findOne({
            attributes: ['echeckListId'],
            where: {
                ...where,
                deleted: {
                    [Op.not]: true
                }
            },
            include: [{
                    model: uv_route,
                    attributes: ['code', 'name'],
                },
                {
                    model: edisposal_route,
                    attributes: ['proposedPrice'],
                    include: [{
                            model: uv_price_item,
                            attributes: ['name']
                        },
                        {
                            model: uv_price_channel,
                            attributes: ['name']
                        }
                    ]
                }
            ]
        });
    }
    static getOne(where, transaction = null) {
        return this.findOne({
                where
            },
            transaction
        );
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

    static addRecord(record, transaction = null) {
        return this.create(
            record, {
                returning: true
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
    static getExcel(pagination, orderBy, models) {
        let wherelist= {
            edisposals:{},
            echecklists:{deleted: {[Op.not]: true}},
            edisposal_cycle:{deleted: {[Op.not]: true}},
            edisposal_route:{deleted: {[Op.not]: true}},
            edisposal_priceguide:{},
            edisposal_proposal:{},
            uv_route:{},
            uv_price_item:{},
            uv_price_channel:{},
            uv_condition:{}
        };

        if(models)
        {
            _.forEach(models, (model) => {
                if(!model.likeArr) model.likeArr = [];
                if(!model.filter) model.filter = [];
                if(model.name && wherelist[model.name] && (model.likeArr.length > 0 || model.filter.length > 0))
                {
                    let where = this.genWhere(model.likeArr,model.filter);
                    wherelist[model.name]=
                    {
                        ...where,
                        ...wherelist[model.name]
                    } 
                }
            });

        }
        
        return this.findAndCountAll({
            subQuery: false,
            where: {
                ...wherelist.edisposals,
                deleted: {
                    [Op.not]: true
                }
            },
            include: [
                {
                    model: echecklists,
                    attributes: (models["echecklists"] && models["echecklists"]["attr"])?models["echecklists"]["attr"]:null,
                    where: wherelist.echecklists,
                    required: true
                },
                {
                    model: edisposal_cycle,
                    attributes: (models["edisposal_cycle"] && models["edisposal_cycle"]["attr"])?models["edisposal_cycle"]["attr"]:null,
                    required: true,
                    include:[
                        {
                            model: edisposal_route,
                            attributes: (models["edisposal_route"] && models["edisposal_route"]["attr"])?models["edisposal_route"]["attr"]:null,
                            where: wherelist.edisposal_route,
                            required: false,
                            include:[{
                                model: uv_route,
                                attributes: (models["uv_route"] && models["uv_route"]["attr"])?models["uv_route"]["attr"]:null,
                                where: wherelist.uv_route,
                                required: true
                            },{
                                model: uv_price_channel,
                                attributes:(models["uv_price_channel"] && models["uv_price_channel"]["attr"])?models["uv_price_channel"]["attr"]:null,
                                required: false
                            },{
                                model: edisposal_priceguide,
                                attributes: (models["edisposal_priceguide"] && models["edisposal_priceguide"]["attr"])?models["edisposal_priceguide"]["attr"]:null,
                                where: wherelist.edisposal_priceguide,
                                required: false,
                                include:[{
                                    model: uv_price_item,
                                    attributes: (models["uv_price_item"] && models["uv_price_item"]["attr"])?models["uv_price_item"]["attr"]:null,
                                    required: true,
                                    where: wherelist.uv_price_item,
                                    include:[{
                                        model: uv_price_channel,
                                        attributes: (models["uv_price_channel"] && models["uv_price_channel"]["attr"])?models["uv_price_channel"]["attr"]:null,
                                        required: true,
                                        where: wherelist.uv_price_channel
                                    }]
                                }]
                            },{
                                model: edisposal_proposal,
                                attributes: (models["edisposal_proposal"] && models["edisposal_proposal"]["attr"])?models["edisposal_proposal"]["attr"]:null,
                                where: wherelist.edisposal_proposal,
                                required: false,
                                include:[{
                                    model: uv_price_item,
                                    attributes: (models["uv_price_item"] && models["uv_price_item"]["attr"])?models["uv_price_item"]["attr"]:null,
                                    required: true,
                                    where: wherelist.uv_price_item,
                                    include:[{
                                        model: uv_price_channel,
                                        attributes: (models["uv_price_channel"] && models["uv_price_channel"]["attr"])?models["uv_price_channel"]["attr"]:null,
                                        required: true,
                                        where: wherelist.uv_price_channel
                                    }]
                                }]
                            }]
                        }
                    ]
                },
                {
                    model: uv_condition,
                    attributes: (models["uv_condition"] && models["uv_condition"]["attr"])?models["uv_condition"]["attr"]:null,
                    where: wherelist.uv_condition
                },
                {
                    model: uv_route,
                    attributes: (models["uv_route"] && models["uv_route"]["attr"])?models["uv_route"]["attr"]:null,
                    required: true
                },
                {
                    model: uv_route,
                    as: 'uv_route_prev',
                    attributes: (models["uv_route"] && models["uv_route"]["attr"])?models["uv_route"]["attr"]:null,
                    required: false
                }
            ],
            ...pagination,
            attributes: (models["edisposals"] && models["edisposals"]["attr"])?models["edisposals"]["attr"]:null,
            order: [orderBy]
        });
    }
    static genWhere(likeArr = [],filterArr = []){
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
        return where;
    }
};