const Sequelize = require("sequelize");
const schema = require('./schema');
var _ = require('lodash');

const tableName = "customerDetails";
const modelName = "customerDetails";

const Op = Sequelize.Op;
const Utils = require('../../../../utils/database.utils');

const CustomerGroup = require('../../models/1.customerGroup');
const CustomerFinance = require('../../models/12.customerFinance');
const CustomerContact = require('../../models/13.customerContact');
const Company = require('../../models/7.company');
const GeneralMaster = require('../../../generalMaster');


const ModelWithPublisher = require('@driveit/publisher-lib').ModelWithPublisher;
module.exports = class CustomerDetails extends ModelWithPublisher {
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
        this.myAssociation = this.belongsTo(models.Customer, {
            foreignKey: 'customerId'
        });
        this.myAssociation = this.hasMany(models.CustomerFinance, {
            foreignKey: 'customerDetailsId'
        });
        this.myAssociation = this.hasMany(models.CustomerContact, {
            foreignKey: 'customerDetailsId'
        });
        this.myAssociation = this.hasMany(models.CustomerCorrespondenceAddress, {
            foreignKey: 'customerDetailsId'
        });
        this.myAssociation = this.hasMany(models.CustomerRemarks, {
            foreignKey: 'customerDetailsId'
        });
        this.myAssociation = this.hasMany(models.CustomerTags, {
            foreignKey: 'customerDetailsId'
        });
        this.myAssociation = this.belongsTo(models.CustomerGroup, {
            foreignKey: 'customerGroupId'
        });
        this.myAssociation = this.belongsTo(models.Company, {
            foreignKey: 'companyId'
        });

        if(!_.isEmpty(GeneralMaster)){
            this.myAssociation = this.hasOne(GeneralMaster.PostCode, {
                foreignKey: 'id',
                sourceKey: "cPostcodeId",
                as: "cPostcode"
            });
            this.myAssociation = this.hasOne(GeneralMaster.City, {
                foreignKey: 'id',
                sourceKey: "cCityId",
                as: "cCity"
            });
            this.myAssociation = this.hasOne(GeneralMaster.State, {
                foreignKey: 'id',
                sourceKey: "cStateId",
                as: "cState"
            });
            this.myAssociation = this.hasOne(GeneralMaster.Country, {
                foreignKey: 'id',
                sourceKey: "cCountryId",
                as: "cCountry"
            });
            this.myAssociation = this.hasOne(GeneralMaster.AreaOperatorCode, {
                foreignKey: 'id',
                sourceKey: "mobileCode",
                as: "areaOperatorCode"
            });
            //M
            this.myAssociation = this.hasOne(GeneralMaster.PostCode, {
                foreignKey: 'id',
                sourceKey: "mPostcodeId",
                as: "mPostcode"
            });
            this.myAssociation = this.hasOne(GeneralMaster.City, {
                foreignKey: 'id',
                sourceKey: "mCityId",
                as: "mCity"
            });
            this.myAssociation = this.hasOne(GeneralMaster.State, {
                foreignKey: 'id',
                sourceKey: "mStateId",
                as: "mState"
            });
            this.myAssociation = this.hasOne(GeneralMaster.Country, {
                foreignKey: 'id',
                sourceKey: "mCountryId",
                as: "mCountry"
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
                    model: CustomerContact
                },
                { 
                    model: CustomerFinance,
                    include: [
                        {
                            model: CustomerGroup
                        }
                    ]
                },
                {
                    model: GeneralMaster.PostCode,
                    as: "mPostcode",
                    attributes: ["id", "code"],
                },
                {
                    model: GeneralMaster.Country,
                    as: "mCountry",
                    attributes: ["id", "code", "name"],
                },
                { 
                    model: Company,
                    attributes: ["id", "code", "name"],
                },
            ],
            order: [
                ["createdAt", "DESC"]
            ]
        });
    }

    static getAll(where, attribute = [], pagination = {
        limit: null,
        offset: 0
    }, orderBy = ["createdAt", "DESC"], skipInclude = true) {

        let include = [];

        if(!skipInclude) {
            include = [
                { 
                    model: CustomerContact
                },
                { 
                    model: CustomerFinance,
                    include: [
                        {
                            model: CustomerGroup
                        }
                    ]
                },
                {
                    model: GeneralMaster.PostCode,
                    as: "mPostcode",
                    attributes: ["id", "code"],
                },
                {
                    model:GeneralMaster.AreaOperatorCode,
                    as:'areaOperatorCode',
                    attributes: ["id", "code"],
                },
                {
                    model: GeneralMaster.Country,
                    as: "mCountry",
                    attributes: ["id", "code", "name"],
                },
                { 
                    model: Company,
                    attributes: ["id", "code", "name"],
                },
            ]
        }

        return this.findAndCountAll({
            where,
            include,
            ...pagination,
            order: [orderBy]
        });
    }

    static searchAll(likeArr, attributes = null, pagination, orderBy, filterArr = [], skipInclude = false, optShowAll = false) {
        let prepQry = [];
        let where = {};

        let whereFilter = [
            !optShowAll ? {
                deleted: false
            } : {}
        ]; //for filtering deleted
        /* let status = {};
        if(!optShowAll) {
            status['deleted'] = { [Op.not]: true};
        } */
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
                [Op.and]: whereFilter
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
        
            return this.create(
                obj, {
                    returning: true,
                    transaction: transaction
                });
    }

    static updateCustomerDetails(customerDetails, where) {
        
            return this.update(customerDetails, {
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

    static getOne(where, transaction = null) {
        return this.findOne({
            where
        }, transaction);
    }

}