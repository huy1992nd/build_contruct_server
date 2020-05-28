var GenerateService = require('./generate.service');
const Helper = require('../common/helper.class');
const FILE_NAME = 'default.json';
const g_define = require('../define');
class GServiceService extends GenerateService {
    constructor(data, project) {
        super(data, project);
        this.type = 'service';
    }

    // @Overide
    OnInitListFile() {
        return new Promise((resolve, reject) =>{
            try {
                this.listFile = [];
                this.data.forEach((item, index)=>{
                    let file_item = {
                        id : index,
                        type : "js",
                        data_config : {
                            "table": item.table,
                            "table_u": item.table.charAt(0).toUpperCase() + item.table.slice(1),
                            "dataField": this.generateData(item.fields)
                        },
                        template_file_name : "service.txt",
                        name : item.table + ".service.js",
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
        Object.keys(list_field)
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