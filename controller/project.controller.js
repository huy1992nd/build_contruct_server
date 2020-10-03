
const g_define = require('../define');
const fse = require('fs-extra');
var GConfigService = require('../services/g_config.service');
var GDBConfigService = require('../services/g_db_config.service');
var GPackageService = require('../services/g_package.service');
var GModelService = require('../services/g_model.service');
var GControllerService = require('../services/g_controller.service');
var GServiceService = require('../services/g_service.service');
var GSubRouterService = require('../services/g_sub_router.service');
var GRouterService = require('../services/g_router.service');
const Helper = require('../common/helper.class');
class ProjectController {
    constructor(project) {
        console.log(JSON.stringify( project));
        this.project = project;
        this.GConfigService = new GConfigService(project.data.config.env, project);
        this.GDBConfigService = new GDBConfigService(project.data.config.env, project);
        this.GPackageService = new GPackageService(project.data.env, project);
        this.GModelService = new GModelService(project.data.models, project);
        this.GControllerService = new GControllerService(project.data.models, project);
        this.GServiceService = new GServiceService(project.data.models, project);
        this.GSubRouterService = new GSubRouterService(project.data.models, project);
        this.GRouterService = new GRouterService(project.data.models, project);
    }

    async generateProject() {
        try {
            // Remove old File
            await fse.emptyDir(g_define.PATH.FOLDER.TMP.PROJECT + this.project.name);
            // Clone contruct from template
            await fse.copy(g_define.PATH.FOLDER.TEMPLATE.PROJECT, g_define.PATH.FOLDER.TMP.PROJECT + this.project.name)
            // Get list table and save list model first time from database
            let infor_table = await Helper.parseDatabase(this.project.data.config.env, this.project.name);
            // Generate file config
            await this.GConfigService.generateCode(infor_table);
            // Generate file db config
            await this.GDBConfigService.generateCode(infor_table);
            // Generate pakage.json file
            await this.GPackageService.generateCode(infor_table);
            // Generate models
            await this.GModelService.generateCode(infor_table);
            // Generate controllers
            await this.GControllerService.generateCode(infor_table);
            // Generate services
            await this.GServiceService.generateCode(infor_table);
            // Generate router
            await this.GRouterService.generateCode(infor_table);
        } catch (error) {
            console.log('have error', error);
        }
     
    }
}

module.exports = ProjectController;
