const Sequelize = require("sequelize");
const schema = require('./schema');
var _ = require('lodash');
const StatusEnum = require('../enums/Status');
const Utils = require('../../../../utils/database.utils');
const uv_condition = require('../02.uv_condition');
const uv_cond_section = require('../03.uv_cond_section');
const uv_cond_reason = require('../04.uv_cond_reason');
const echecklist_conddetails = require('../17.echecklist_conddetails');
const tableName = "echecklist_condlists";
const modelName = "echecklist_condlists";
const Op = Sequelize.Op;

// const ModelWithPublisher = require('@driveit/publisher-lib').ModelWithPublisher;
module.exports = class Echecklist_condlists extends Sequelize.Model {

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
        this.myAssociation = this.belongsTo(models.uv_condition,{
            foreignKey: 'condId'
        });
        this.myAssociation = this.hasMany(models.echecklist_conddetails,{
            foreignKey: 'condListId'
        });
        this.myAssociation = this.belongsTo(models.echecklist_inspection, {
            foreignKey: 'inspectionId',
            targetKey: 'id'
        });
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

    static searchAll(likeArr = [], attribute = [], pagination, orderBy, filterArr = []) 
    {
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

        return uv_cond_section.findAndCountAll({
            attributes: ['id',
            'code',
            'name',
            'seqNo',
            'isImportant',
            'isMajorIncident'
            // ,'weight'
            ],
            where: {
                deleted: {
                    [Op.not]: true
                }
            },
            include: [{
                model: this,
                required: false,
                attributes: ['inspectionId','condSecId','condId'],
                include: [{
                    model: uv_condition,
                    attributes: ['id','name','color', 'score'],
                    required: false,
                    where: {
                        deleted: {
                            [Op.not]: true
                        }
                    }
                },{
                    model: echecklist_conddetails,
                    attributes: ['condReasonId'],
                    required: false,
                    where: {
                        ...where
                    },
                    include: [{
                        model: uv_cond_reason,
                        attributes: ['reason', 'rating'],
                        where: {
                            deleted: {
                                [Op.not]: true
                            }
                        }
                        ,include:[{
                            model: uv_condition,
                            attributes: ['color'],
                            required: false,
                            where: {
                                deleted: {
                                    [Op.not]: true
                                }
                            }
                        }]
                    }]
                }]
                ,where: {
                    ...where
                }
            },{
                model: uv_cond_reason,
                attributes: ['id','reason','rating'],
                where: {
                    deleted: {
                        [Op.not]: true
                    }
                },
                // include: [{
                //     model: uv_condition,
                //     attributes: ['id','name','color','seqNo'],
                //     required: false,
                //     where: {
                //         deleted: {
                //             [Op.not]: true
                //         }
                //     }
                // }],
                order: [uv_cond_reason, 'reason', 'asc']      
            }],
            ...pagination,
            order: [orderBy]
        }).then(echecklist_cond => {
            const resObj = _.map(echecklist_cond.rows, (cond) => { 
                const resObjCondList = _.map(cond.echecklist_condlists, (c) => { 
                    let values =[];
                    let resObjCondDetail = [];
                    if(c.echecklist_conddetails){
                        c.echecklist_conddetails.forEach((r)=>{
                            values.push(r.condReasonId);

                            resObjCondDetail.push({
                                condReasonId: r.condReasonId,
                                reason: (r.uv_cond_reason)?r.uv_cond_reason.reason:null,
                                condId: (r.uv_cond_reason)?r.uv_cond_reason.condId:null,
                                rating: (r.uv_cond_reason)?r.uv_cond_reason.rating:null,
                                color: (r.uv_cond_reason.uv_condition)?r.uv_cond_reason.uv_condition.color:null
                            });
                        });
                    }; 
                    
                    return Object.assign({
                        condId: (c.uv_condition)?c.uv_condition.id:null,
                        condition: (c.uv_condition)?c.uv_condition.name:null,
                        conditionColor: (c.uv_condition)?c.uv_condition.color:null,
                        score: (c.uv_condition)?c.uv_condition.score:null,
                        value: values,
                        echecklist_conddetails: resObjCondDetail
                    })
                });
                const resObjCondReason = _.map(cond.uv_cond_reasons, (r) => { 
                    return Object.assign({
                        condReasonId: (r)?(r.id):null,
                        reason: (r)?r.reason:null,
                        rating: (r)?r.rating:null
                        // condId: (r.uv_condition)?r.uv_condition.id:null,
                        // condition: (r.uv_condition)?r.uv_condition.name:null,
                        // color: (r.uv_condition)?r.uv_condition.color:null
                    })
                });
                
                const objCL = (resObjCondList.length>0)?resObjCondList[0]:{};
                return Object.assign({
                    condSecId: cond.id,
                    name: cond.name,
                    isImportant: cond.isImportant,
                    isMajorIncident: cond.isMajorIncident,
                    ...objCL
                    ,uv_cond_reason: resObjCondReason
                });
            });
            return {rows: resObj};
        });
    }
}