"use strict";
const config = require('config');
const g_define = require('../define');
const models = require('../models');
const Project = models.Project;
const projectController  = require ('./project.controller');
const Helper = require('../common/helper.class');
// let OkexController = require('./exchanges/okex.res.controller');
// Class to manage gateways
class AppController {
    constructor() {
        this.gatewayInfos = {};             // Store gateway objects
    }

    /*********** Public funtions ***********/
    Init() {
        this.loadDB();
    }

    /*********** Private funtions ***********/
    async loadDB() {
        try {
            let listProject = await Project.findAll({});
            Helper.asyncForEach(listProject, async (project)=>{
                if(project && project.status == g_define.STATUS_PROJECT.READY){
                    if(this.checkDataStatus(project.data)){
                        let ProjectController = new projectController(project);
                        await ProjectController.generateProject();
                    }else{
                        await Project.update({ status: g_define.STATUS_PROJECT.ERROR }, { where: { id: project.id } });
                    }
                }
            });
          } catch (err) {
            console.log('Have error when load data', err);
          }
    }

     /*********** Private funtions ***********/

    checkDataStatus(data){
        return true;
    }

}

module.exports = new AppController();