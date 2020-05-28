var GenerateService = require('./generate.service');
const Helper = require('../common/helper.class');
const FILE_NAME = 'default.json';
const g_define = require('../define');
class GConfigService extends GenerateService {
    constructor(data, project) {
        super(data, project);
        this.type = 'config';
    }

    // @Overide
    OnInitListFile() {
        return new Promise((resolve, reject) =>{
            try {
                this.listFile = [];
                this.data.forEach((item, index)=>{
                    let file_item = {
                        id : item.environment_name+"_"+index,
                        type : "js",
                        data_config : {
                            "port": item.server.port,
                            "env": item.environment_name,
                            "clientId": item.keyCloak.clientId,
                            "clientSecret": item.keyCloak.clientSecret,
                            "bearerOnly": item.keyCloak.bearerOnly,
                            "serverUrl": item.keyCloak.serverUrl,
                            "realm": item.keyCloak.realm,
                            "realmPublicKey": item.keyCloak.realmPublicKey
                        },
                        template_file_name : "main.js",
                        name : "main.js",
                        dir_save : g_define.PATH.FOLDER.TMP.PROJECT+this.project.name+"/config/"+item.environment_name,
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

module.exports = GConfigService;