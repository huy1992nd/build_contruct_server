const fs = require('fs');
const Helper = require('../common/helper.class');
const g_define = require('../define');
class GenerateService {
    constructor(data, project) {
        this.data = data;
        this.project = project;
        this.listContenFileTemplate = {};
        this.listFile = [];
    }

    async generateCode() {
        try {
            return new Promise(async (resolve, reject) => {
                try {
                    console.log(this.type + ' ---> generateCode');
                    // get list file need generate
                    let initListFile = await this.OnInitListFile();
                    if (!initListFile) {
                        return;
                    }
                    await Helper.asyncForEach(this.listFile, async file => {
                        await this.generateFile(file);
                    });
                    await this.exportProject();
                    resolve(true);
                } catch (error) {
                    reject(error);
                }

            })

        } catch (error) {
            this.OnResolveError(error);
        }

    }

    OnInitListFile() {
        console.log(this.type + 'aaa');
    }

    generateFile(file) {
        return new Promise(async (resolve, reject) => {
            let contentFile = file.data_config;
            try {
                if (!file.set_data) {
                    let contentFileTemplate = await this.OnGetContentFileTemplate(file);
                    if (!contentFileTemplate) {
                        return;
                    }
                    contentFile = await this.OnReplaceContentFile(contentFileTemplate, file);
                    if (!contentFile) {
                        return;
                    }
                }
                let saveFile = await this.OnSaveFile(contentFile, file);
                if (!saveFile) {
                    return;
                }
                console.log(this.type + ' saveFile ', saveFile);
                resolve(true);
            } catch (error) {
                reject(error)
            }
        })
    }

    OnGetContentFileTemplate(file) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!this.listContenFileTemplate[file.template_file_name]) {
                    let path_file = `./template/components/${this.type}/${file.template_file_name}`;
                    let contentFileTemplate = await Helper.getContentFileTemplate(path_file);
                    this.listContenFileTemplate[file.template_file_name] = contentFileTemplate;
                }
                resolve(this.listContenFileTemplate[file.template_file_name]);
            } catch (error) {
                reject(error);
            }
        });
    }

    OnReplaceContentFile(contentFileTemplate, file) {
        return new Promise((resolve, reject) => {
            try {
                let list_atribute = file.data_config || {};
                let content = Helper.replaceFileContent(contentFileTemplate, list_atribute);
                resolve(content);
            } catch (error) {
                reject(error);
            }
        });
    }

    OnSaveFile(contentFile, file) {
        return new Promise(async (resolve, reject) => {
            try {
                await Helper.createFolderIfNotExit(file.dir_save);
                let path_file = file.dir_save + "/" + file.name;
                await Helper.saveFile(contentFile, path_file, file);
                resolve(true);
            } catch (error) {
                reject(error);
            }
        });
    }

    OnResolveError(error) {
        console.log(this.type + ' have error ', error);
    }

    exportProject() {
        return new Promise((resolve, reject) => {
            try {
                resolve(true);
            } catch (error) {
                reject(error)
            }
        })
    }
}


module.exports = GenerateService;