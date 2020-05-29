const Sequelize = require("sequelize");
const schema = require('./schema');
var _ = require('lodash');

const tableName = "payment";
const modelName = "payment";
const Op = Sequelize.Op;
const Utils = require('../../../../utils/database.utils');
const customerMaster = require('../../../customerMaster');
const generalMaster = require('../../../generalMaster');
const BillingModel = require('../48.billing');
const PaymentItemModel = require('../77.paymentItem');
const CustomerMaster = require('../../../customerMaster');
const Auth = require('../../../auth');

// const ModelWithPublisher = require('@driveit/publisher-lib').ModelWithPublisher;
module.exports = class Payment extends Sequelize.Model {

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
        if (!_.isEmpty(customerMaster)) {
        this.myAssociation = this.hasOne(customerMaster.Branch, {
                sourceKey: "branchId",
                foreignKey: 'id',

            });
        }
        if (!_.isEmpty(generalMaster)) {
        this.myAssociation = this.hasOne(generalMaster.PaymentMode, {
                sourceKey: "paymentModeId",
                foreignKey: 'id',

            });
            this.myAssociation = this.hasOne(generalMaster.Currency, {
                sourceKey: "currencyId",
                foreignKey: 'id',

            });
        }
        // this.myAssociation = this.hasMany(models.Billing, {
        //     foreignKey: 'paymentId',
        //     sourceKey: 'id'
        // });
        this.myAssociation = this.hasMany(models.PaymentItem, {
            foreignKey: 'paymentId',
            sourceKey: 'id'
        });
        if (!_.isEmpty(CustomerMaster)) {
            this.myAssociation = this.hasOne(CustomerMaster.Customer, {
                sourceKey: "billTo",
                foreignKey: "id",
                as: "billToInfo"
            });
        }
        if(!_.isEmpty(Auth)) {
            this.myAssociation = this.hasOne(Auth.InternalUsers, {
                foreignKey: "id",
                sourceKey: "updatedBy",
                as: "updatedByInfo",
            });

            this.myAssociation = this.hasOne(Auth.InternalUsers, {
                foreignKey: "id",
                sourceKey: "createdBy",
                as: "createdByInfo",
            });
        }
    }

    //methods
    static getOne(where, transaction = null) {
        return this.findOne({
            where
        }, transaction);
    }

    static getAll(where, transaction = null) {
        return this.findAll({
            where
        }, transaction);
    }

    static getRecords(pagination, orderBy, where, transaction = null, paymentItemCondition = null) {
        const generalAttributes = ['id', 'code', 'name'];
        return this.findAndCountAll({
            where,
            include:[
                {
                    model: customerMaster.Branch,
                    attributes: [...generalAttributes]
                },
                {
                    model: generalMaster.PaymentMode,
                    attributes: [...generalAttributes]
                },
                {
                    model: generalMaster.Currency,
                    attributes: [...generalAttributes]
                },
                {
                    model: Auth.InternalUsers,
                    attributes: ['id', 'fullName'],
                    as: 'updatedByInfo'
                },
                {
                    model: Auth.InternalUsers,
                    attributes: ['id', 'fullName'],
                    as: 'createdByInfo'
                },
                {
                    model: CustomerMaster.Customer,
                    attributes: ['id', 'name', 'identityNo'],
                    as: "billToInfo",
                    include: {
                        model: CustomerMaster.CustomerDetails,
                        separate: true,
                        attributes: ['id', 'mAddress1','mAddress2', 'mAddress3','mPostcodeId', 'mStateId', 'mCityId', 'mCountryId'],
                        include: [
                            {
                                model: generalMaster.PostCode,
                                as: "mPostcode",
                                attributes: ["id", "code"],
                            },
                            {
                                model: generalMaster.State,
                                as: "mState",
                                attributes: [...generalAttributes],
                            },
                            {
                                model: generalMaster.City,
                                as: "mCity",
                                attributes: [...generalAttributes],
                            },
                            {
                                model: generalMaster.Country,
                                as: "mCountry",
                                attributes: [...generalAttributes],
                            }
                        ]
                    }
                },
                // {
                //     model: BillingModel,
                //     attributes: [
                //         'id','roId','billTo','billToName','amountPayable','appliedAmount','updatedAt'
                //     ]
                // }
                {
                    model: PaymentItemModel,
                    where: paymentItemCondition,
                    attributes: [
                        'id','repairOrderId','invoiceNo','invoiceDate','billingId','currencyId','outstandingAmount','appliedAmount','createdAt','updatedAt'
                    ],
                    include: [
                        {
                            model: generalMaster.Currency,
                            attributes: [...generalAttributes]
                        },
                    ]
                }
            ],
            ...pagination,
            order: [orderBy],
            distinct: true, // to correct count
        }, transaction);
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

    static deleteRecord(where, transaction = null) {
        return this.destroy({
            where: where
        }, transaction);
    }

}