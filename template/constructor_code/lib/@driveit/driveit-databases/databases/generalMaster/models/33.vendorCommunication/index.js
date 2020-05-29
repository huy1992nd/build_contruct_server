const Sequelize = require("sequelize");
const schema = require('./schema');
var _ = require('lodash');

const modelName = "vendorCommunication";
const tableName = "vendorCommunication";
const Op = Sequelize.Op;
const Utils = require('../../../../utils/database.utils');

const Country = require('../../models/01.country');
const PostCode = require('../../models/04.postcode');

/** cannot use cache function. to use it, add id column to the table **/
// 
// 

// const ModelWithPublisher = require('@driveit/publisher-lib').ModelWithPublisher;
module.exports = class VendorCommunication extends Sequelize.Model {
    //schema
    static init(sequelize, DataTypes, databaseName) {
        return super.init(schema(DataTypes), {
            tableName,
            modelName,
            schema: databaseName,
            sequelize
        });
    }

    static associate(models) {
        this.myAssociation = this.belongsTo(models.VendorBasic, {
            foreignKey: 'vendorId'
        });
        this.myAssociation = this.belongsTo(models.PostCode, {
            foreignKey: "postcodeId"
        });
        this.myAssociation = this.belongsTo(models.Country, {
            foreignKey: "countryId"
        });
    }

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
                {
                    model: PostCode,
                    attributes: ["id", "code"],
                },
                {
                    model: Country,
                    attributes: ["id", "code", "name"],
                }
            ],
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

    static getAllByIds(ids, attribute = [], pagination = {
        limit: null,
        offset: 0
    }, orderBy = ["createdAt", "DESC"]) {
        let where = {};
        if (!_.isEmpty(ids)) {
            where = {
                id: {
                    [Op.in]: ids
                }
            };
        }
        return this.findAndCountAll({
            where,
            ...pagination,
            order: [orderBy]
        });
    }

    static searchAll(likeArr, attributes = null, pagination, orderBy, filterArr = [], skipInclude = false) {
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

    static addNew(obj, transaction) {
        // 
        return this.create(
            obj, {
                returning: true,
                transaction: transaction
            });
        // });
    }

    static updateVendorComm(communicationData, where) {
        // 
        return this.update(communicationData, {
            where: where
        });
        // });
    }

    static deleteHard(where) {
        // 
        return this.destroy({
            where: where
        });
        // });
    }
    static deleteSoft(where, who) {
        // 
        return this.update({
            deleted: true,
            updatedBy: who
        }, {
            where: where
        });
        // });
    }

}