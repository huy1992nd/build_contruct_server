const Sequelize = require("sequelize");
const schema = require('./schema');
var _ = require('lodash');

const tableName = "customerVehicleRelationHistory";
const modelName = "customerVehicleRelationHistory";
const Op = Sequelize.Op;
const Utils = require('../../../../utils/database.utils');

const CustomerMaster = require('../../../customerMaster');
const GeneralMaster = require('../../../generalMaster');
const VehicleModel = require('../09.vehicle');

// const ModelWithPublisher = require('@driveit/publisher-lib').ModelWithPublisher;
module.exports = class CustomerVehicleRelationHistory extends Sequelize.Model {

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
        this.myAssociation = this.belongsTo(models.Vehicle, {
            foreignKey: 'vehicleId',
            targetKey: 'id'
        });

        if (!_.isEmpty(CustomerMaster)) {
            this.myAssociation = this.hasOne(CustomerMaster.Customer, {
                foreignKey: "id",
                sourceKey: "customerId"
            });
        }
    }

    //methods
    static getId(where) {
        return this.findOne({
            where: {
                ...where,
                deleted: {
                    [Op.not]: true
                }
            },
            order: [
                ["createdAt", "DESC"]
            ]
        });
    }

    static getAll(where, attribute = [], pagination = { limit: null, offset: 0 }, orderBy = ["createdAt", "DESC"]) {
        return this.findAndCountAll({
            where,
            ...pagination,
            order: [orderBy]
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
            include = [
                {
                    model: VehicleModel,
                    attributes: ['id', 'regNo', 'chassisNo', 'vehicleStatus']
                },
                {
                    model: CustomerMaster.Customer,
                    attributes: ['id', 'salutationId', 'name', 'identityId', 'identityNo'],
                    include: [
                        {
                            model: GeneralMaster.Salutation,
                            attributes: ['id', 'code', 'name']
                        },
                        {
                            model: GeneralMaster.Identity,
                            attributes: ['id', 'code', 'name']
                        }
                    ]
                }
            ];
        }

        let searchAllObj = {
            where: {
                ...where,
                deleted: {
                    [Op.not]: true
                }
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

    static searchAllNoCount(likeArr, attributes = []) {
        let prepQry = [];
        let where = {};
        if (likeArr.length > 0) {
            _.forEach(likeArr, (likeArrItem) => {
                let qry = {};
                qry[likeArrItem.colId] = { [Op.like]: likeArrItem.text };
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
        return this.create(
            obj, {
                returning: true,
                transaction: transaction
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

    static deleteHard(where) {
        return this.destroy({
            where: where
        });
    }
    static deleteSoft(where, who) {
        return this.update({
            deleted: true, updatedBy: who
        }, {
            where: where
        });
    }

}