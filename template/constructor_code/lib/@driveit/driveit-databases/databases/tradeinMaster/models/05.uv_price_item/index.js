const Sequelize = require("sequelize");
const schema = require('./schema');
var _ = require('lodash');
const Utils = require('../../../../utils/database.utils');
const tableName = "uv_price_item";
const modelName = "uv_price_item";
const Op = Sequelize.Op;
const uv_price_channel = require('../06.uv_price_channel');
const uv_price_config = require('../27.uv_price_config');
// const ModelWithPublisher = require('@driveit/publisher-lib').ModelWithPublisher;
module.exports = class Uv_price_item extends Sequelize.Model {

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

        this.myAssociation = this.belongsTo(uv_price_channel, {
            foreignKey: 'prcChannelId',
            targetKey: 'id'
        });

        this.myAssociation = this.hasOne(uv_price_config, {
            foreignKey: 'prcItemId',
            sourceKey: 'id'
        });

        // this.myAssociation = this.belongsTo(uv_price_channel, {
        //     foreignKey: 'prcChannelId',
        //     targetKey: 'id'
        // });

        // this.myAssociation = this.hasMany(uv_price_config, {
        //     foreignKey: 'prcItemId',
        //     sourceKey: 'id'
        // });
    }

    static searchAll(likeArr = [], attribute = [], pagination, orderBy, filterArr = []) {
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

        return this.findAndCountAll({
            attributes: ['id',
                'name',
                'code',
                'inputType',
                'maxLength',
                'isReadOnly',
                'isUploadImg',
                'validatePattern',
                'formatText'
            ],
            include: [{
                    model: uv_price_channel,
                    attributes: ["id", "code", "name", "seqNo"],
                    where: {
                        deleted: {
                            [Op.not]: true
                        }
                    },
                    required: true
                },
                {
                    model: uv_price_config,
                    attributes: ["id", "seqNo", "isHidden"],
                    where: {
                        ...where,
                        deleted: {
                            [Op.not]: true
                        }
                    },
                    required: true
                }
            ],
            where: {
                deleted: {
                    [Op.not]: true
                }
            },
            ...pagination,
            attributes: attribute,
            order: [orderBy]
        }).then(price_item => {
            const resObj = _.map(price_item.rows, (pi) => {
                return Object.assign({
                    id: pi.id,
                    code: pi.code,
                    name: pi.name,
                    inputType: pi.inputType,
                    formatText: pi.formatText,
                    maxLength: pi.maxLength,
                    isReadOnly: pi.isReadOnly,
                    isRequired: pi.isRequired,
                    isUploadImg: pi.isUploadImg,
                    isHidden: pi.uv_price_config.isHidden,
                    seqNo: pi.uv_price_config.seqNo,
                    channelCode: pi.uv_price_channel.code,
                    channelName: pi.uv_price_channel.name,
                    channelSeqNo: pi.uv_price_channel.seqNo,
                    validatePattern: pi.validatePattern
                });
            });
            return {
                rows: resObj.sort((a, b) => (a.channelSeqNo - b.channelSeqNo)).sort((a, b) => (a.seqNo - b.seqNo))
            };
        });
    }
}