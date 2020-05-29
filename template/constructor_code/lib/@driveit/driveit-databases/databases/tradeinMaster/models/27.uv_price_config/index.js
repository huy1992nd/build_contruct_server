const Sequelize = require("sequelize");
const schema = require('./schema');
var _ = require('lodash');
const StatusEnum = require('../enums/Status');
const Utils = require('../../../../utils/database.utils');
const tableName = "uv_price_config";
const modelName = "uv_price_config";
const Op = Sequelize.Op;
let uv_price_item = {};
let uv_price_channel = {};

// const ModelWithPublisher = require('@driveit/publisher-lib').ModelWithPublisher;
module.exports = class Uv_price_config extends Sequelize.Model {

        //schema
        static init(sequelize, databaseName) {
            return super.init(schema(), {
                tableName,
                modelName,
                schema: databaseName,
                sequelize
            });
        }
        static associate(models) {
            this.uv_price_item = models.uv_price_item;
            this.uv_price_channel = models.uv_price_channel;

            this.myAssociation = this.belongsTo(models.uv_price_item,{
                foreignKey: 'prcItemId',
                targetKey: 'id'
            });
        }
        static searchAll(likeArr = [], attribute = [], pagination, orderBy, filterArr = []) {
            let prepQry = [];
            let where = {};
            let wherePriceChannel = {};
            if(likeArr.length>0) {
                _.forEach(likeArr, (likeArrItem) => {
                    let qry = {};
                    qry[likeArrItem.colId] = {[Op.like]: likeArrItem.text};
                    prepQry.push(qry);
                });
                where = {[Op.or]: prepQry};
            }
            
            let arrFilter = Utils.filterGenerator(filterArr);
            
            if (arrFilter.length > 0) {
                _.forEach(arrFilter, (val) => {
                    _.forEach(val, (v, k) => {
                        if (k === 'prcChannelCode') {
                            wherePriceChannel['code'] = v;
                        } else {
                            where[k] = v;
                        }
                    });
                });
            }
    
            return this.findAndCountAll({
                where: {
                    ...where,
                    deleted: {
                        [Op.not]: true
                    }
                },
                include: [
                    {
                        model: this.uv_price_item,
                        attributes: ["code","name","inputType", "maxLength", "prcChannelId","validatePattern"],
                        include: [{
                            model: this.uv_price_channel,
                            attributes: ["id","code","name"],
                            where : wherePriceChannel
                        }],
                        required: true
                    }
                ],
                ...pagination,
                attributes: attribute,
                order: [orderBy]
            });
        }
    
}