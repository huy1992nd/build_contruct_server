var GenerateService = require('./generate.service');
const Helper = require('../common/helper.class');
const FILE_NAME = 'default.json';
const g_define = require('../define');
var pluralize = require('pluralize');
class GModelService extends GenerateService {
    constructor(data, project) {
        super(data, project);
        this.type = 'model';
    }

    // @Overide
    OnInitListFile(infor_table) {
        return new Promise((resolve, reject) => {
            try {
                this.listFile = [];
                infor_table.list_table.forEach((table_name, index) => {
                    let file_item = {
                        id: index,
                        type: "js",
                        data_config: {
                            "table_name": table_name,
                            "table_singer": pluralize.singular(table_name),
                            "table_u": Helper.upFirst(pluralize.singular(table_name)),
                            "associate": this.generateAssociate(infor_table.list_associate, table_name),
                        },
                        template_file_name: `${table_name}.js`,
                        name: `${pluralize.singular(table_name)}.js`,
                        dir_save: g_define.PATH.FOLDER.TMP.PROJECT + this.project.name + "/models/",
                    }
                    this.listFile.push(file_item);
                });
                resolve(true);
            } catch (error) {
                reject(error);
            }
        })
    }

    // @Overide 
    OnGetContentFileTemplate(file) {
        return new Promise(async (resolve, reject) => {
            try {
                let path_file = `${g_define.PATH.FOLDER.MODEL_RENDER + this.project.name}/${file.template_file_name}`;
                let contentFileTemplate = await Helper.getContentFileTemplate(path_file);
                resolve(contentFileTemplate);
            } catch (error) {
                reject(error);
            }
        });
    }

    // @Overide 
    OnReplaceContentFile(contentFileTemplate, file) {
        return new Promise((resolve, reject) => {
            try {
                let data_config = file.data_config;
                let content = contentFileTemplate.replace(`/* jshint indent: 1 */`, `'use strict';`);
                let content = content.replace(`return sequelize.define('${data_config.table_name}`, `var ${data_config.table_u} = sequelize.define('${data_config.table_u}`);
                content = content.replace(`});`, `});
                    ${data_config.associate}
                    return ${data_config.table_u}; 
                `);
                resolve(content);
            } catch (error) {
                reject(error);
            }
        });
    }

    //Private
    generateAssociate(list_associate, table_name) {
        let listBelongsTo = list_associate[table_name] ? list_associate[table_name].belongsTo : [];
        let listHasMany = list_associate[table_name] ? list_associate[table_name].hasMany : [];
        let table_u = Helper.upFirst(pluralize.singular(table_name));
        let belongsTo_str = listBelongsTo.length ? listBelongsTo.map(item => {
            let table_to_u = Helper.upFirst(pluralize.singular(item.table_to));
            return `${table_u}.belongsTo(models.${table_to_u},{
                foreingKey: '${item.foreignKey}'
            })`
        }).join(`,`) : "";
        let hasMany_str = listHasMany.length ? listHasMany.map(item => {
            let table_to_u = Helper.upFirst(pluralize.singular(item.table_to));
            return `${table_u}.hasMany(models.${table_to_u}, {
                foreignKey: '${item.foreignKey}',
                targetKey: "${item.targetKey}",
            })`;
        }).join(`,
        `) : "";
        let comma = listBelongsTo.length && listHasMany.length ? `,
        ` : "";
        if(listBelongsTo.length && listHasMany.length){
            return `${table_u}.associate = (models) => {
                    ${belongsTo_str}${comma}${hasMany_str}
                }`;
        }else{
            return "";
        }
    }
}

module.exports = GModelService;