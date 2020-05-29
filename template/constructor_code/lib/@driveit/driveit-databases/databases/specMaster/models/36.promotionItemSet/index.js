const Sequelize = require("sequelize");
const schema = require('./schema');
var _ = require('lodash');
const tableName = "promotionItemSet";
const modelName = "promotionItemSet";
const Op = Sequelize.Op;
const Utils = require('../../../../utils/database.utils');



module.exports = class PromotionItemSet extends Sequelize.Model {

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
        this.myAssociation = this.belongsTo(models.Promotion, {
            foreignKey: 'promotionId',
            targetKey: 'id'
        });
        this.myAssociation = this.belongsTo(models.PromotionType, {
            foreignKey: 'promotionTypeId',
            targetKey: 'id'
        });
    }

    static addNew(obj, transaction) {
        
            return this.create(
                obj
                , {
                returning: true,
                transaction: transaction
            });
        
    }

    static async delete(where, who, type = "soft") {
        if(type == "soft") {
            return await this.deleteSoft(where, who).then(()=>{
                return this.getAll(where, null).then((resp)=>{
                    // if(!resp) {
                    // throw errorDef.MASTERDATA_NOT_FOUND;
                    // }
                    return resp;
                });
            });
        } else if (type == "hard") {
            return await this.deleteHard(where).then((resp)=>{
                if(!resp) {
                    return resp;
                } else {
                    return where;
                }
            });
        }
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