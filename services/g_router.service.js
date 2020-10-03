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
    OnInitListFile(infor_table) {
        return new Promise((resolve, reject) => {
            try {
                this.listFile = [];
                let file_item = {
                    id: 1,
                    type: "js",
                    data_config: {
                        "listImport": this.generateListImport(infor_table.list_table_singular),
                        "listRouter": this.generateListRouter(infor_table.list_table_singular)
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
    generateListImport(list_table) {
        let result =
        list_table
                .map(table_name => {
                    let table_u = Helper.upFirst(table_name);
                    return `const ${table_u}Controller = require('../controllers/${table_name}Controller');`
                }).join(`
        `);
        return `${result}`;
    }
    // Private
    generateListRouter(list_table) {
        let result =
        list_table
                .map(table_name => {
                    let table_u = Helper.upFirst(table_name);
                    return `/* ${table_u} router */
                    const ${table_name}Router = express.Router();
                    ${table_name}Router.get('', keycloak.protect(), (req, res, next) => ${table_u}Controller.get${table_u}(req, res, next));
                    ${table_name}Router.post('', keycloak.protect(), (req, res, next) => ${table_u}Controller.add${table_u}(req, res, next));
                    ${table_name}Router.put('', keycloak.protect(), (req, res, next) => ${table_u}Controller.update${table_u}(req, res, next));
                    ${table_name}Router.delete('', keycloak.protect(), (req, res, next) => ${table_u}Controller.delete${table_u}(req, res, next));
                    ${table_name}Router.post('/search' , keycloak.protect(),  (req, res, next) => ${table_u}Controller.search${table_u}(req, res, next));
                    app.use('/api/${table_name}', ${table_name}Router);`
                }).join(`
        `);
        return `
        ${result}`;
    }

}

module.exports = GRouterService;