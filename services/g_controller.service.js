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
    OnInitListFile(infor_table) {
        return new Promise((resolve, reject) =>{
            try {
                this.listFile = [];
                infor_table.list_table_singular.forEach((table_name, index)=>{
                    let file_item = {
                        id : index,
                        type : "js",
                        data_config : {
                            "table": table_name,
                            "table_u": Helper.upFirst(table_name)
                        },
                        template_file_name : "controller.txt",
                        name : table_name + "Controller.js",
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