const Sequelize = require("sequelize");
const schema = require('./schema');
var _ = require('lodash');

const tableName = "repairOrderBillTo";
const modelName = "repairOrderBillTo";
const Op = Sequelize.Op;
const Utils = require('../../../../utils/database.utils');

// const ModelWithPublisher = require('@driveit/publisher-lib').ModelWithPublisher;
module.exports = class RepairOrderPendingRemarks extends Sequelize.Model {

    //schema
    static init(sequelize, DataTypes, databaseName) {
        return super.init(schema(DataTypes), {
            tableName,
            modelName,
            schema: databaseName,
            sequelize
        });
    }

    //associations
    static associate(models) {
    }

    //methods
    

}
