var GenerateService = require('./generate.service');
const Helper = require('../common/helper.class');
const FILE_NAME = 'default.json';
const g_define = require('../define');
class GPackageService extends GenerateService {
    constructor(data, project) {
        super(data, project);
        this.type = 'package';
    }

    // @Overide
    OnInitListFile() {
        return new Promise((resolve, reject) => {
            try {
                this.listFile = [{
                    type: "json",
                    data_config: {
                        project_name: this.project.name
                    },
                    name: "package.json",
                    template_file_name : "package.json",
                    dir_save: g_define.PATH.FOLDER.TMP.PROJECT + this.project.name + "/",
                }];
                resolve(true);
            } catch (error) {
                reject(error);
            }
        })
    }

    // @Overide
    OnReplaceContentFile(contentFileTemplate, file) {
        return new Promise((resolve, reject) => {
            try {
                let content = JSON.parse(contentFileTemplate);
                content.name = file.data_config.project_name
                resolve(content);
            } catch (error) {
                reject(error);
            }
        });
    }
}

module.exports = GPackageService;