var GenerateService = require('./generate.service');
const Helper = require('../common/helper.class');
const FILE_NAME = 'default.json';
const g_define = require('../define');
class GDBConfigService extends GenerateService {
    constructor(data, project) {
        super(data, project);
        this.type = 'configdb';
    }

    // @Overide
    OnInitListFile() {
        return new Promise((resolve, reject) =>{
            try {
                this.listFile = [];
                this.data.forEach((item, index)=>{
                    let file_item = {
                        type:"json",
                        set_data: true,
                        data_config : item.db_connect,
                        name : "config.json",
                        dir_save : g_define.PATH.FOLDER.TMP.PROJECT+this.project.name+"/configdb/"+item.environment_name,
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

module.exports = GDBConfigService;