const Sequelize = require("sequelize");
const schema = require('./schema');
var _ = require('lodash');
const StatusEnum = require('../enums/Status');

const tableName = "notification";
const modelName = "notification";

const Op = Sequelize.Op;
const Utils = require('../../../../utils/database.utils');

// const ModelWithPublisher = require('@driveit/publisher-lib').ModelWithPublisher;
module.exports = class Notification extends Sequelize.Model {
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
        // this.myAssociation = this.hasMany(models.Country, {foreignKey: 'notificationId'});
    }
    //methods

    static getId(where) {
        let status = {};
        status['deleted'] = {
            [Op.not]: true
        };
        return this.findOne({
            where: {
                ...where,
                [Op.and]: status
            },
            // attributes: ["id"],
            order: [
                ["createdAt", "DESC"]
            ]
        });
    }

    static getAll(where, attribute = [], pagination = {
        limit: null,
        offset: 0
    }, orderBy = ["createdAt", "DESC"]) {
        return this.findAndCountAll({
            where,
            ...pagination,
            order: [orderBy]
        });
    }

    static searchAll(likeArr, attribute = [], pagination, orderBy, filterArr = []) {
        let prepQry = [];
        let whereSearch = {};
        let whereFilter = [{
            deleted: false
        }, ...Utils.filterGenerator(filterArr)]; //for filtering deleted

        if (likeArr.length > 0) {
            _.forEach(likeArr, (likeArrItem) => {
                let qry = {};
                qry[likeArrItem.colId] = {
                    [Op.like]: likeArrItem.text
                };
                prepQry.push(qry);
            });
            whereSearch = {
                [Op.or]: prepQry
            };
        }
        return this.findAndCountAll({
            where: {
                ...whereSearch,
                [Op.and]: whereFilter
            },
            ...pagination,
            order: [orderBy]
        });
    }

    static addNew(obj, transaction) {
        return this.create(
            obj, {
                returning: true,
                transaction: transaction
            });
    }

    static updateNotification(notification, where) {
        return this.update(notification, {
            where: where
        });
    }

    static deleteHard(where) {
        return this.destroy({
            where: where
        });
    }
    static deleteSoft(where, who) {
        return this.update({
            deleted: true,
            updatedBy: who
        }, {
            where: where
        });
    }

}