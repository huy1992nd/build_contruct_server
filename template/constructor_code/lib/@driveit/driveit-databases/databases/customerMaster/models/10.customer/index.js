const Sequelize = require("sequelize");
const schema = require('./schema');
var _ = require('lodash');

const tableName = "customer";
const modelName = "customer";

const Op = Sequelize.Op;
const Utils = require('../../../../utils/database.utils');
const CustomerDetails = require('../../models/11.customerDetails');
const CustomerFinance = require('../../models/12.customerFinance');
const CustomerContact = require('../../models/13.customerContact');
const ContactRelationShip = require('../../models/5.contactRelationship');
const CustomerAccountGroup = require('../../models/6.customerAccountGroup');
const CustomerCorrespondenceAddress = require('../../models/33.customerCorrespondenceAddress');
const CustomerRemarks = require('../../models/34.customerRemarks');
const CustomerTags = require('../../models/35.customerTags');
const CompanyModel = require('../../models/7.company');
const generalMaster = require('../../../generalMaster');


const ModelWithPublisher = require('@driveit/publisher-lib').ModelWithPublisher;
// module.exports = class Customer extends ModelWithPublisher {
module.exports = class Customer extends ModelWithPublisher {

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
        this.myAssociation = this.hasMany(models.CustomerDetails, {
            foreignKey: 'customerId'
        });
        // this.myAssociation = this.hasMany(models.CustomerContact, {foreignKey: 'customerId'});
        this.myAssociation = this.belongsTo(models.CustomerAccountGroup, {
            foreignKey: 'customerAccountGroupId',
        });
        
        this.myAssociation = this.hasMany(models.CustomerContact, {
            foreignKey: 'customerId',
            sourceKey: 'id',
        });
        this.myAssociation = this.hasMany(models.CustomerFinance, {
            foreignKey: 'customerId',
            sourceKey: 'id'
        });


        if(!_.isEmpty(generalMaster)){
            this.myAssociation = this.hasOne(generalMaster.Salutation, {
                foreignKey: 'id',
                sourceKey: "salutationId",
            });
            this.myAssociation = this.hasOne(generalMaster.Country, {
                foreignKey: 'id',
                sourceKey: "countryId",
            });
            this.myAssociation = this.hasOne(generalMaster.Region, {
                foreignKey: 'id',
                sourceKey: "regionId",
            });
            this.myAssociation = this.hasOne(generalMaster.Identity, {
                foreignKey: 'id',
                sourceKey: "identityId",
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
                { 
                    model: CustomerAccountGroup
                }
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
            ...pagination,
            order: [orderBy]
        });
    }

    static searchAll(likeArr, attributes = null, pagination, orderBy, filterArr = [], skipInclude = false, optShowAll = false) {
        let prepQry = [];
        let where = {};
        // let where = !optShowAll ? {
        //     status: "enabled"
        // } : {};

        let whereFilter = !optShowAll ? { deleted: { [Op.not]: true } } : {};
        
        if (likeArr.length > 0) {
            _.forEach(likeArr, (likeArrItem) => {
                let qry = {};
                qry[likeArrItem.colId] = {
                    [Op.like]: likeArrItem.text
                };
                prepQry.push(qry);
            });
            where = {
                ...where,
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

        const commonAttr = [
            'id',
            'code',
            'name',
        ]

        if (!skipInclude) {
            include = [{
                    model: CustomerAccountGroup,
                    attributes: commonAttr,
                },
                {
                    model: generalMaster.Salutation,
                    attributes: commonAttr,
                },
                {
                    model: generalMaster.Country,
                    attributes: commonAttr,
                },
                {
                    model: generalMaster.Region,
                    attributes: commonAttr,
                },
                {
                    model: generalMaster.Identity,
                    attributes: commonAttr,
                },
                {
                    model: CustomerDetails,
                    include: [{
                            model: CustomerFinance
                        },
                        {
                            model: CustomerContact,
                            include: [{
                                model: generalMaster.Salutation,
                                attributes: commonAttr,
                            }, {
                                model: ContactRelationShip,
                                attributes: commonAttr,
                            }],
                        },
                        {
                            model: CustomerCorrespondenceAddress
                        },
                        {
                            model: CustomerRemarks
                        },
                        {
                            model: CustomerTags
                        },
                        {
                            model: generalMaster.PostCode,
                            attributes: ['id', 'code'],
                            as: 'cPostcode'
                        },
                        {
                            model:generalMaster.AreaOperatorCode,
                            attributes: ['id', 'code'],
                            as: 'areaOperatorCode'
                            
                        },
                        {
                            model: generalMaster.City,
                            attributes: commonAttr,
                            as: 'cCity'
                        },
                        {
                            model: generalMaster.State,
                            attributes: commonAttr,
                            as: 'cState'
                        },
                        {
                            model: generalMaster.Country,
                            attributes: commonAttr,
                            as: 'cCountry'
                        },
                        //M
                        {
                            model: generalMaster.PostCode,
                            attributes: ['id', 'code'],
                            as: 'mPostcode'
                        },
                        {
                            model: generalMaster.City,
                            attributes: commonAttr,
                            as: 'mCity'
                        },
                        {
                            model: generalMaster.State,
                            attributes: commonAttr,
                            as: 'mState'
                        },
                        {
                            model: generalMaster.Country,
                            attributes: commonAttr,
                            as: 'mCountry'
                        },
                        {
                            model: CompanyModel,
                            attributes: commonAttr
                        },
                        // {
                        //     model: CustomerGroup
                        // }
                    ]
                }
            ];
        }

        let searchAllObj = {
            where: {
                ...where,
                ...whereFilter
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

    static getRecordsNoInclude(likeArr, attribute = [], pagination, orderBy, filterArr = [], optShowAll = false) {
        let prepQry = [];
        let where = !optShowAll ? {
            status: "enabled"
        } : {};

        let whereFilter = [
            !optShowAll ? {
                deleted: false
            } : {}
        ]; //for filtering deleted

        if (likeArr.length > 0) {
            _.forEach(likeArr, (likeArrItem) => {
                let qry = {};
                qry[likeArrItem.colId] = {
                    [Op.like]: likeArrItem.text
                };
                prepQry.push(qry);
            });
            where = {
                ...where,
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

        return this.findAndCountAll({
            where: {
                ...where,
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

    static updateCustomer(customer, where) {

        return this.update(customer, {
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