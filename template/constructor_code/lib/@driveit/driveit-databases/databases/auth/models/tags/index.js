const Sequelize = require("sequelize");
const schema = require('./schema');
var _ = require('lodash');
const StatusEnum = require('../enums/Tags');

const tableName = "tags";
const modelName = "tags";
const Op = Sequelize.Op;
const Utils = require('../../../../utils/database.utils');
const listing = require('../../../../utils/listing');

// const ModelWithPublisher = require('@driveit/publisher-lib').ModelWithPublisher;
module.exports = class Tags extends Sequelize.Model {

    //schema
    static init(sequelize, databaseName) {
        return super.init(schema(), {
            tableName,
            modelName,
            schema: databaseName,
            sequelize
        });
    }

    //associations
    static associate(models) {
        // this.myAssociation = this.hasMany(models.TenantsTags, {foreignKey: 'tagId'});
    }

    //methods
    static getId(where) {
        let status = {};
        status['status'] = { [Op.not]: StatusEnum.DELETED };
        return this.findOne({
            where: {
                ...where,
                [Op.and]: status
            },
            attributes: ["id"],
            order: [
                ["createdAt", "DESC"]
            ]
        });
    }

    static getAll(where, attributes = [], pagination = {
        limit: null,
        offset: 0
    }, orderBy = ["createdAt", "DESC"]) {
        return this.findAndCountAll({
            where,
            ...pagination,
            order: [orderBy]
        });
    }

    static getAllTag(where, attribute = []) {
        return this.findAll({
            where,
            order: [
                ["createdAt", "DESC"]
            ],
            attributes: attribute
        });
    }

    static searchAll(likeArr = [], attributes = null, pagination, orderBy, filterArr = [], skipInclude = false) {
        let prepQry = [];
        let where = {};
        if (likeArr.length > 0) {
            _.forEach(likeArr, (likeArrItem) => {
                let qry = {};
                qry[likeArrItem.colId] = { [Op.like]: likeArrItem.text };
                prepQry.push(qry);
            });
            where = { [Op.or]: prepQry };
        }

        let arrFilter = Utils.filterGenerator(filterArr);

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

    static getRecords3({
        pagination,
        orderBy,
        where,
        include,
    }) {
        const customInclude = [
            
        ];
        
        return listing.getSearch({
            sequelizeModel: this,
            pagination,
            orderBy,
            where,
            include: include || customInclude
        });
    }

    static addTag(tagObj, transaction) {
        return this.create(
            tagObj
            , {
                returning: true,
                transaction: transaction
            });
    }

    static updateTag(tag, where) {
        return this.update(tag, {
            where: where
        });
    }

    static deleteHard(where) {
        return this.destroy({
            where: where
        });
    }

    static deleteSoft(where, obj) {
        return this.update(
            { deleted: true, updatedBy: obj.updatedby }
            , {
                where: where
            }
        );
    }

}