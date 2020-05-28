var GenerateService = require('./generate.service');
const Helper = require('../common/helper.class');
const FILE_NAME = 'default.json';
const g_define = require('../define');
class GRouterService extends GenerateService {
    constructor(data, project) {
        super(data, project);
        this.type = 'router';
    }

    // @Overide
    OnInitListFile() {
        return new Promise((resolve, reject) => {
            try {
                this.listFile = [];
                let file_item = {
                    id: 1,
                    type: "js",
                    data_config: {
                        "listImport": this.generateListImport(this.data),
                        "listRouter": this.generateListRouter(this.data)
                    },
                    template_file_name: "router.txt",
                    name: "router.js",
                    dir_save: g_define.PATH.FOLDER.TMP.PROJECT + this.project.name + "/router/",
                }
                this.listFile.push(file_item);
                resolve(true);
            } catch (error) {
                reject(error);
            }
        })
    }

    // Private
    generateListImport(list_model) {
        let result =
            list_model
                .map(model => {
                    return `var ${model.table}Router = require('../router/${model.table}.router');`
                }).join(`
        `);
        return `
        ${result}
        `;
    }
    // Private
    generateListRouter(list_model) {
        let result =
            list_model
                .map(model => {
                    return `app.use('/api/${model.table}', keycloak.protect(), ${model.table}Router);`
                }).join(`
        `);
        return `
        ${result}
        `;
    }

}

module.exports = GRouterService;