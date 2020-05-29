const Sequelize = require("sequelize");
const schema = require('./schema');
var _ = require('lodash');
const StatusEnum = require('../enums/Status');
const Utils = require('../../../../utils/database.utils');

const tableName = "echecklist_attachement";
const modelName = "echecklist_attachement";
const Op = Sequelize.Op;
const uv_file_upload = require('../10.uv_file_upload');
const uv_file_upload_config = require('../19.uv_file_upload_config');

// const ModelWithPublisher = require('@driveit/publisher-lib').ModelWithPublisher;
module.exports = class Echecklist_attachement extends Sequelize.Model {

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
/*         this.myAssociation = uv_file_upload_config.hasMany(this, {
            foreignKey: 'fileUploadConfigId',
            sourceKey: 'id'
        }); */

        this.myAssociation = this.belongsTo(models.uv_file_upload, {
            foreignKey: 'fileId',
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
        
        let sObject = ['echecklist_attachement','uv_file_upload_config'];
        let filters = {};
        let wheres = {};
        _.forEach(sObject, (obj) => {
            wheres[obj] = {};
            filters[obj] = { name: obj, filterArr:[]};
            _.forEach(filterArr,(filter)=>{
                let sObj = "";
                if (filter['colId'] && filter['colId'].indexOf(obj) !== -1){
                    sObj = obj;
                    filter['colId'] = filter['colId'].replace(sObj+'.', '')
                }else if (filter['colId'] && filter['colId'].indexOf('.') === -1){
                    sObj = sObject[0];
                }                
                if(sObj == obj){
                    filters[sObj].filterArr.push(filter);
                }
            })
        });
        _.forEach(filters, (filter) => {
            let arrFilter = Utils.filterGenerator(filter.filterArr);
            if (arrFilter.length > 0) {
                _.forEach(arrFilter, (val) => {
                    _.forEach(val, (v, k) => {
                        if(filter.name==sObject[0]){
                            where[k] = v;
                        }else{
                            wheres[filter.name][k]=v;
                        }
                    });
                });
            }
        });
        
        return uv_file_upload_config.findAndCountAll({
            attributes: ['id',
            'code',
            'name',
            'folder_name',
            'minlimit',
            'maxlimit',
            'file_ext',
            'file_ext_doc',
            'filesize',
            'isShowEdisposal',
            'seqNo',
            'seqNoED'
            ],
            include: [{
                model: this,
                attributes: ["id", "echeckListId", "fileId", "fileUploadConfigId"],
                where: {
                    ...where,
                    deleted: {
                        [Op.not]: true
                    }
                },
                include: [{
                    model: uv_file_upload,
                    attributes: ["id", "fileName","path","isDocument"],
                    required: false,
                    deleted: {
                        [Op.not]: true
                    }
                }],
                required: false
            }],
            where: {
                ...wheres['uv_file_upload_config'],
                deleted: {
                    [Op.not]: true
                }
            },
            ...pagination,
            order: [orderBy]
        })
        .then(file_upload_config => {
            const resObj = _.map(file_upload_config.rows, (fc) => { 
                return Object.assign({
                    id: fc.id,
                    code: fc.code,
                    title: fc.name,
                    folderName: fc.folder_name,
                    minlimit: fc.minlimit,
                    maxlimit: fc.maxlimit,
                    fileExt: fc.file_ext,
                    fileExtDoc: fc.file_ext_doc,
                    filesize: fc.filesize,
                    isShowEdisposal: fc.isShowEdisposal,
                    fileList: _.map(fc.echecklist_attachements, (file) => { 
                        return Object.assign({
                            id: file.fileId,
                            fileName: file.uv_file_upload.fileName,
                            fileUrl: file.uv_file_upload.path,
                            isDocument: file.uv_file_upload.isDocument
                        });
                    })
                });
            });
            return {rows: resObj};
        });
    }
}