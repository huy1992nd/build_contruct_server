var GenerateService = require('./generate.service');
const Helper = require('../common/helper.class');
const FILE_NAME = 'default.json';
const g_define = require('../define');
var pluralize = require('pluralize');
class GServiceService extends GenerateService {
    constructor(data, project) {
        super(data, project);
        this.type = 'service';
    }

    // @Overide
    OnInitListFile(infor_table) {
        return new Promise((resolve, reject) =>{
            try {
                this.listFile = [];
                infor_table.list_table.forEach((table_name, index)=>{
                    let table_name_singular = pluralize.singular(table_name);
                    let file_item = {
                        id : index,
                        type : "js",
                        data_config : {
                            "table": table_name_singular,
                            "table_u": Helper.upFirst(table_name_singular),
                            "dataField": this.generateData(infor_table.list_field[table_name])
                        },
                        template_file_name : "service.txt",
                        name : table_name_singular + ".service.js",
                        dir_save : g_define.PATH.FOLDER.TMP.PROJECT+this.project.name+"/services/",
                    }
                    this.listFile.push(file_item);
                });
                resolve(true);
            } catch (error) {
                reject(error);
            }
        })
    }

    // Private
    generateData(list_field){
        let data_create = 
        list_field
        .filter((field) => { return !['id', 'createdAt', 'updatedAt', 'deleted'].includes(field)})
        .map(field=>{
            return `${field}: input.${field}`
        }).join(`,
        `);
        return `
        {
           ${data_create} 
        }
        `;
    }

}

module.exports = GServiceService;