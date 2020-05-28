var GenerateService = require('./generate.service');
const Helper = require('../common/helper.class');
const FILE_NAME = 'default.json';
const g_define = require('../define');
class GControllerService extends GenerateService {
    constructor(data, project) {
        super(data, project);
        this.type = 'controller';
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
                            "table_u": item.table.charAt(0).toUpperCase() + item.table.slice(1)
                        },
                        template_file_name : "controller.txt",
                        name : item.table + "Controller.js",
                        dir_save : g_define.PATH.FOLDER.TMP.PROJECT+this.project.name+"/controllers/",
                    }
                    this.listFile.push(file_item);
                });
                resolve(true);
            } catch (error) {
                reject(error);
            }
        })
    }

}

module.exports = GControllerService;