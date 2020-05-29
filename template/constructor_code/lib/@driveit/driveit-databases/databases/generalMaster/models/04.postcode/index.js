const Sequelize = require("sequelize");
const schema = require('./schema');
var _ = require('lodash');

const tableName = "postcode";
const modelName = "postcode";
const Op = Sequelize.Op;
const Utils = require('../../../../utils/database.utils');




// const ModelWithPublisher = require('@driveit/publisher-lib').ModelWithPublisher;
module.exports = class Postcode extends Sequelize.Model {

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
        this.myAssociation = this.belongsTo(models.City, {
            foreignKey: 'cityId'
        });
        this.myAssociation = this.belongsTo(models.State, {
            foreignKey: 'stateId'
        });
        this.myAssociation = this.belongsTo(models.Country, {
            foreignKey: 'countryId'
        });
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

    static searchAll(likeArr, attributes = null, pagination, orderBy, filter = [], skipInclude = false) {
        let prepQry = [];
        let where = {};
        if (likeArr.length > 0) {
            _.forEach(likeArr, (likeArrItem) => {
                let qry = {};
                qry[likeArrItem.colId] = {
                    [Op.like]: likeArrItem.text
                };
                prepQry.push(qry);
            });
            where = {
                [Op.or]: prepQry
            };
        }

        let arrFilter = Utils.filterGenerator(filter);

        if (arrFilter.length > 0) {
            _.forEach(arrFilter, (val) => {
                _.forEach(val, (v, k) => {
                    where[k] = v;
                });
            });
        }

        let include = [];
        if (!skipInclude) {
            include = [];
        }

        let searchAllObj = {
            where: {
                ...where,
                deleted: {
                    [Op.not]: true
                }
            },
            include,
            ...pagination,
            order: [orderBy]
        };
        if (attributes !== null && !_.isEmpty(attributes)) {
            searchAllObj['attributes'] = attributes;
        }

        return this.findAndCountAll(searchAllObj);
    }

    static searchAllNoCount(likeArr, attributes = []) {
        let prepQry = [];
        let where = {};
        if (likeArr.length > 0) {
            _.forEach(likeArr, (likeArrItem) => {
                let qry = {};
                qry[likeArrItem.colId] = {
                    [Op.like]: likeArrItem.text
                };
                prepQry.push(qry);
            });
            where = {
                [Op.or]: prepQry
            };
        };

        return this.findAll({
            where: {
                ...where,
                deleted: {
                    [Op.not]: true
                }
            },
            attributes
        });
    }

    static addNew(obj, transaction) {
        let postcodeObj = {
            code: obj.code,
            countryId: obj.countryId,
            stateId: obj.stateId,
            cityId: obj.cityId,
            createdBy: obj.createdBy,
            updatedBy: obj.updatedBy
        }
        return this.create(
            postcodeObj, {
                returning: true,
                transaction: transaction
            });
    }

    static updatePostcode(postcode, where) {
        return this.update(postcode, {
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