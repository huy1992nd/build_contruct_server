const Sequelize = require("sequelize");
const schema = require('./schema');
var _ = require('lodash');

const tableName = "storageLocation";
const modelName = "storageLocation";
const Op = Sequelize.Op;
const Utils = require('../../../../utils/database.utils');

const StorageModel = require('../25.storage');
// const BranchModel = require('../18.branch');
const generalMaster = require('../../../generalMaster');

// const ModelWithPublisher = require('@driveit/publisher-lib').ModelWithPublisher;
module.exports = class StorageLocation extends Sequelize.Model {

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
        this.myAssociation = this.belongsTo(models.Branch, {
            foreignKey: 'branchId',
            sourceKey: 'id'
        });
        this.myAssociation = this.belongsTo(models.Storage, {
            foreignKey: 'storageId',
            sourceKey: 'id'
        });

        if(!_.isEmpty(generalMaster)){
            this.myAssociation = this.hasOne(generalMaster.City, {
                foreignKey: 'id',
                sourceKey: "cityId",
            });
            this.myAssociation = this.hasOne(generalMaster.PostCode, {
                foreignKey: 'id',
                sourceKey: "postcodeId",
            });
            this.myAssociation = this.hasOne(generalMaster.State, {
                foreignKey: 'id',
                sourceKey: "stateId",
            });
            this.myAssociation = this.hasOne(generalMaster.Country, {
                foreignKey: 'id',
                sourceKey: "countryId",
            });
        }
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
            include: [
                { model: StorageModel }
            ],
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
            include: [
                { model: StorageModel }
            ],
            ...pagination,
            order: [orderBy]
        });
    }

    static searchAll(likeArr, attributes = null, pagination, orderBy, filterArr = [], skipInclude = false) {
        let prepQry = [];
        let whereSearch = {};
        let whereFilter = [{
            deleted: false
        }]; //for filtering deleted

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

        let arrFilter = Utils.filterGenerator(filterArr);

        if (arrFilter.length > 0) {
            _.forEach(arrFilter, (val) => {
                _.forEach(val, (v, k) => {
                    whereSearch[k] = v;
                });
            });
        }

        let include = [];
        if (!skipInclude) {
            include = [
                { model: StorageModel }
            ];
        }

        let searchAllObj = {
            where: {
                ...whereSearch,
                [Op.and]: whereFilter
            },
            include,
            distinct: true,
            ...pagination,
            order: [orderBy]
        };
        if (attributes !== null && !_.isEmpty(attributes)) {
            searchAllObj['attributes'] = attributes;
        }

        return this.findAndCountAll(searchAllObj);
    }

    static addNew(obj, transaction) {

        return this.create(
            obj, {
            returning: true,
            transaction: transaction
        });
    }

    static updateStorageLocation(storageLocation, where) {

        return this.update(storageLocation, {
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