const Sequelize = require("sequelize");
const schema = require('./schema');
var _ = require('lodash');
const StatusEnum = require('../enums/Status');
const Utils = require('../../../../utils/database.utils');
const uv_tyre_area = require('../08.uv_tyre_area');
const echecklist_inspection = require('../14.echecklist_inspection');
const tableName = "echecklist_tyre_thread";
const modelName = "echecklist_tyre_thread";
const Op = Sequelize.Op;

// const ModelWithPublisher = require('@driveit/publisher-lib').ModelWithPublisher;
module.exports = class Echecklist_tyre_thread extends Sequelize.Model {

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
/*         this.myAssociation = this.hasOne(models.echecklist_inspection, {
            foreignKey: 'id',
            sourceKey: 'inspectionId'
        }); */
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

        return uv_tyre_area.findAndCountAll({
            attributes: ['id',
            'code',
            'name',
            'groupName',
            'seqNo',
            'required',
            'isShowLabelCompare'
            ],
            where: {
                deleted: {
                    [Op.not]: true
                }
            },
            include: [{
                model: this,
                required: false,
                attributes: ['inspectionId','tyreAreaId','thread'],
                where: {
                    ...where
                },
                include: [{
                    model: echecklist_inspection,
                    required: false,
                    attributes: ['createdAt', 'inspectionNo']
                }]
            }],
            ...pagination,
            order: [orderBy]
        }).then(echecklist_tt => {
            const resObj = _.map(echecklist_tt.rows, (tt) => { 
                return Object.assign({
                    tyreAreaId: tt.id,
                    code: tt.code,
                    name: tt.name,
                    groupName: tt.groupName,
                    seqNo: tt.seqNo,
                    required: tt.required,
                    isShowLabelCompare: tt.isShowLabelCompare,
                    thread: (tt.echecklist_tyre_threads.length > 0)? tt.echecklist_tyre_threads[0].thread:0,
                    inspectionDate: (tt.echecklist_tyre_threads.length > 0)? tt.echecklist_tyre_threads[0].echecklist_inspection.createdAt:'',
                    inspectionNo: (tt.echecklist_tyre_threads.length > 0)? tt.echecklist_tyre_threads[0].echecklist_inspection.inspectionNo:'',
                });
            });
            return {rows: resObj};
        });
    }
}