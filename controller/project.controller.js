
const g_define = require('../define');
var GConfigService = require('../services/g_config.service');
var GDBConfigService = require('../services/g_db_config.service');
var GPackageService = require('../services/g_package.service');
var GModelService = require('../services/g_model.service');
var GControllerService = require('../services/g_controller.service');
var GServiceService = require('../services/g_service.service');
const Helper = require('../common/helper.class');
class ProjectController {
    constructor(project) {
        this.project = project;
        this.GConfigService = new GConfigService(project.data.config.env, project);
        this.GDBConfigService = new GDBConfigService(project.data.config.env, project);
        this.GPackageService = new GPackageService(project.data.env, project);
        this.GModelService = new GModelService(project.data.models, project);
        this.GControllerService = new GControllerService(project.data.models, project);
        this.GServiceService = new GServiceService(project.data.models, project);
    }

    async generateProject() {
        try {
            // Remove old File
            await Helper.removeFolder(this.project.name);
            // Clone contruct from template
            await Helper.cloneFolder(this.project.name);
            // Generate file config
            await this.GConfigService.generateCode();
            // Generate file db config
            await this.GDBConfigService.generateCode();
            // Generate pakage.json file
            await this.GPackageService.generateCode();
            // Generate models
            await this.GModelService.generateCode();
            // Generate controllers
            await this.GControllerService.generateCode();
            // Generate services
            await this.GServiceService.generateCode();
        } catch (error) {
            console.log('have error', error);
        }
     
    }
}

module.exports = ProjectController;
