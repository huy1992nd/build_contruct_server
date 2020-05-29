const Sequelize = require("sequelize");
const schema = require('./schema');
var _ = require('lodash');

const modelName = "campaign";
const tableName = "campaign";
const Op = Sequelize.Op;
const Utils = require('../../../../utils/database.utils');




const CampaignIssuanceModel = require('../../models/41.campaignIssuance');
const CampaignRedemptionModel = require('../../models/42.campaignRedemption');
const TermsAndConditionModel = require('../../models/43.termsAndCondition');
const CompaignTypeModel = require('../../models/40.campaignType');

// const ModelWithPublisher = require('@driveit/publisher-lib').ModelWithPublisher;
module.exports = class Campaign extends Sequelize.Model {
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

        this.myAssociation = this.hasMany(models.CampaignIssuance, {
            foreignKey: 'campaignId',
            sourceKey: 'code'
        });
        this.myAssociation = this.hasMany(models.CampaignRedemption, {
            foreignKey: 'campaignId',
            sourceKey: 'code'
        });
        this.myAssociation = this.hasMany(models.TermsAndConditions, {
            foreignKey: 'campaignId',
            sourceKey: 'code'
        });
        this.myAssociation = this.hasMany(models.Evoucher, {
            foreignKey: 'campaignId',
            sourceKey: 'code'
        });

        this.myAssociation = this.belongsTo(models.CampaignType, {
            foreignKey: 'type',
            targetKey: 'id'
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
            include = [
                {
                    model: TermsAndConditionModel
                },
                {
                    model: CampaignRedemptionModel
                },
            ];
        }

        if(where['CampaignIssuanceProduct']){
            include.push({
                model: CampaignIssuanceModel,
                where: {
                    product: {
                        [Op.not]: null,
                    }
                }
            });
            delete where.CampaignIssuanceProduct;
        }else{
            include.push({
                model: TermsAndConditionModel
            });
        }

        if(where['codeType']){
            include.push({
                model: CompaignTypeModel,
                where: {
                    'code' : where['codeType']
                }
            })
            delete where.codeType;
        }

        let searchAllObj = {
            where: {
                ...where
            },
            include,
            ...pagination,
            order: [orderBy],
            distinct: true
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

    static updateCampaign(campaign, where) {
        
            return this.update(campaign, {
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
    static deleteHard(where) {
        
            return this.destroy({
                where: where
            });
       
    }

}