const Sequelize = require("sequelize");
const schema = require('./schema');
var _ = require('lodash');
const StatusEnum = require('../enums/Status');
const Utils = require('../../../../utils/database.utils');
const uv_purpose = require('../01.uv_purpose');
const uv_condition = require('../02.uv_condition');
const uv_status = require('../07.uv_status');
const echecklist_inspection = require('../14.echecklist_inspection');
const echecklist_priceguide = require('../18.echecklist_priceguide');
const uv_price_item = require('../05.uv_price_item');

const echecklist_attachement = require('../13.echecklist_attachement');
const uv_file_upload = require('../10.uv_file_upload');

const tableName = "echecklists";
const modelName = "echecklists";
const Op = Sequelize.Op;

// const ModelWithPublisher = require('@driveit/publisher-lib').ModelWithPublisher;
module.exports = class Echecklists extends Sequelize.Model {

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
        this.myAssociation = this.belongsTo(models.uv_purpose, {
           foreignKey: 'uvPurposeId',
           targetKey: 'id'
        });

        this.myAssociation = this.belongsTo(models.uv_status, {
           foreignKey: 'uvStatusId',
           targetKey: 'id'
        });
        
        this.myAssociation = this.belongsTo(models.echecklist_inspection, {
            foreignKey: 'lastInspectionId',
            targetKey: 'id',
            constraints: false,
         });
        
        this.myAssociation = this.belongsTo(models.uv_condition, {
           foreignKey: 'overallCondId',
           targetKey: 'id'
        });

        this.myAssociation = this.hasMany(models.echecklist_priceguide, {
            sourceKey: 'lastInspectionId',
            foreignKey: 'inspectionId',
            constraints: false
         });
    }

    //methods
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

    static genOrderBy(orderBy = []){
        if (Array.isArray(orderBy) && orderBy.length > 1 && orderBy[0].includes('.')) {
            let orderByTable = orderBy[0].slice(0, orderBy[0].indexOf('.'));
            let orderByField = orderBy[0].slice(orderBy[0].indexOf('.') + 1, orderBy[0].length)
            let direction = orderBy[1];
            switch(orderByTable) {
                case 'uv_purpose':
                    orderBy.length = 0;
                    orderBy.push(uv_purpose, orderByField, direction);
                    break;
                case 'uv_condition':
                    orderBy.length = 0;
                    orderBy.push(uv_condition, orderByField, direction);
                    break;
                case 'uv_status':
                    orderBy.length = 0;
                    orderBy.push(uv_status, orderByField, direction);
                    break;
                case 'echecklist_inspection':
                    orderBy.length = 0;
                    orderBy.push(echecklist_inspection, orderByField, direction);
                    break;
            }
        }

        return orderBy;
    }

    static searchAll(likeArr = [], attribute = [], pagination, pageOrderBy, filterArr = [], whereUv) {
        let where =this.genWhere(likeArr,filterArr);
        let orderBy = this.genOrderBy(pageOrderBy);

        return this.findAndCountAll({
            where: {
                ...where,
                deleted: {
                    [Op.not]: true
                }
            },
            include: [
                {
                    model: uv_purpose,
                    attributes: ["id","code","name"]
                },
                {   
                    model: uv_condition,
                    attributes: ["id","code","name","color","score"]
                },
                {   
                    model: uv_status,
                    attributes: ["id","code","name"],
                    where: whereUv
                },
                {
                    model: echecklist_inspection,
                    required: false,
                    attributes: ["createdAt","createdBy","createdfullname","updatedAt","updatedBy","updatedfullname","isEnableInspection", "inspectionDate", "inspectionNo", "isTCMapPrice", "lastOfferPrcAt"]
                }
            ],
            ...pagination,
            attributes: attribute,
            order: [orderBy]
        });
    }

    //likeArr = [], attribute = [], pagination, pageOrderBy, filterArr = []
    static searchECheckListVSM(pagination, pageOrderBy,models) 
    {
        let wherelist= {
            echecklists:{deleted: {[Op.not]: true}},
            uv_purpose:{deleted: {[Op.not]: true}},
            uv_status:{ deleted: {[Op.not]: true}}
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
        
        let orderBy = this.genOrderBy(pageOrderBy);
        return this.findAndCountAll({
            where: wherelist.echecklists,
            include: [
                {
                    model: uv_purpose,
                    attributes: (models["uv_purpose"] && models["uv_purpose"]["attr"])?models["uv_purpose"]["attr"]:null,
                    where :wherelist.uv_purpose
                },
                {   
                    model: uv_status,
                    attributes: (models["uv_status"] && models["uv_status"]["attr"])?models["uv_purpose"]["attr"]:null,
                    where: wherelist.uv_status
                },
                {
                    model: echecklist_inspection,
                    required: false,
                    attributes: (models["echecklist_inspection"] && models["echecklist_inspection"]["attr"])?models["echecklist_inspection"]["attr"]:null
                }
            ],
            ...pagination,
            attributes: (models["echecklists"] && models["echecklists"]["attr"])?models["echecklists"]["attr"]:null,
            order: [orderBy],
            raw:true
        });
    }

    static getOne(where, transaction = null) {
        return this.findOne({
            where
        }, transaction);
    }

    static getOneWithStatus(where, transaction = null) {
        return this.findOne({
            where,
            include: [
                {   
                    model: uv_status,
                    attributes: ["code", "name"]
                }
            ]
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


    static searchECheckListExcel(pagination, pageOrderBy,models) 
    {
        let wherelist= {
            echecklists:{deleted: {[Op.not]: true}},
            uv_purpose:{deleted: {[Op.not]: true}},
            uv_status:{ deleted: {[Op.not]: true}},
            echecklist_priceguide: {},
            uv_price_item: {},
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
        
        let orderBy = this.genOrderBy(pageOrderBy);
        return this.findAndCountAll({
            subQuery: false,
            where: wherelist.echecklists,
            include: [
                {
                    model: uv_purpose,
                    attributes: (models["uv_purpose"] && models["uv_purpose"]["attr"])?models["uv_purpose"]["attr"]:null,
                    where :wherelist.uv_purpose
                },
                {   
                    model: uv_status,
                    attributes: (models["uv_status"] && models["uv_status"]["attr"])?models["uv_status"]["attr"]:null,
                    where: wherelist.uv_status
                },
                {
                    model: echecklist_inspection,
                    required: false,
                    attributes: (models["echecklist_inspection"] && models["echecklist_inspection"]["attr"])?models["echecklist_inspection"]["attr"]:null
                    
                },{
                    model: echecklist_priceguide,
                    required: false,
                    attributes: (models["echecklist_priceguide"] && models["echecklist_priceguide"]["attr"])?models["echecklist_priceguide"]["attr"]:null,
                    where: wherelist.echecklist_priceguide,
                    include: [{
                        model: uv_price_item,
                        attributes: (models["uv_price_item"] && models["uv_price_item"]["attr"])?models["uv_price_item"]["attr"]:null,
                        where: wherelist.uv_price_item,
                        required: true,
                    }]
                },
                {   
                    model: uv_condition,
                    attributes: ["name"]
                }
            ],
            ...pagination,
            attributes: (models["echecklists"] && models["echecklists"]["attr"])?models["echecklists"]["attr"]:null,
            order: [orderBy]
        })
    }
}