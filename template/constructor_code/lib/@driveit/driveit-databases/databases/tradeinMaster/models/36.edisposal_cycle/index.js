const Sequelize = require("sequelize");
const schema = require('./schema');
var _ = require('lodash');

const tableName = "edisposal_cycle";
const modelName = "edisposal_cycle";

// const ModelWithPublisher = require('@driveit/publisher-lib').ModelWithPublisher;
module.exports = class Edisposal_route extends Sequelize.Model {

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
        this.myAssociation = this.hasMany(models.edisposal_route, {
            foreignKey: 'edCycleId',
            sourceKey: 'id'
        });
    }
    
    static addRecord(record, transaction = null) {
        return this.create(record, {
            returning: true
        }, transaction);
    }

    static updateRecord(record, where, transaction = null) {
        return this.update(record, {
            where,
            isNewRecord: false
        }, transaction);
    }

    static getOne(where, transaction = null) {
        return this.findOne({
            where
        }, transaction);
    }
}