const Sequelize = require("sequelize");
const schema = require('./schema');
var _ = require('lodash');
const tableName = "uv_file_upload_config";
const modelName = "uv_file_upload_config";

// const ModelWithPublisher = require('@driveit/publisher-lib').ModelWithPublisher;
module.exports = class Uv_file_upload_config extends Sequelize.Model {

    //schema
    static init(sequelize, databaseName) {
        return super.init(schema(), {
            tableName,
            modelName,
                schema: databaseName,
            sequelize
        });
    }

    static associate(models) {
        this.myAssociation = this.hasMany(models.echecklist_attachement, {
            foreignKey: 'fileUploadConfigId',
            targetKey: 'id'
        });
        this.myAssociation = this.hasMany(models.edisposal_attachement, {
            foreignKey: 'fileUploadConfigId',
            targetKey: 'id'
        });
    }
}