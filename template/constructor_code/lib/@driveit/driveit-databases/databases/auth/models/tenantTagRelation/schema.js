const Sequelize = require("sequelize");
const TenantsEnum = require('../enums/Tenants');
const errorDef = require('../../../../utils/error.codes');

module.exports = () => {
    return {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV1
        },
        status: {
            type: Sequelize.ENUM,
            allowNull: false,
            defaultValue: TenantsEnum.PENDING,
            values: [TenantsEnum.status]
        },
        // inactivateReason: {
        //     type: Sequelize.STRING,
        // },
        deleted: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false,
            validate: {
                NOT_UNIQUE: function (deleted, next) {
                    if(deleted){
                        return next();
                    }

                    const Model = require('./index')
                    return Model.getId({id: this.id}).then((record)=> {
                        if(!record) return next();
                        return Model.getAll({
                            tagId: record.tagId,
                            tenantId: record.tenantId
                            })
                            .then((res) => {
                                let recordArray = res.rows;
                                if(recordArray.length > 0) {
                                    recordArray.forEach((record) => {
                                        if (record && !record.deleted && this.id != record.id) {
                                            return next(errorDef.NOT_UNIQUE.message);
                                        }
                                    })
                                }
                                return next();
                            })
                            .catch((err) => {
                                return next(err);
                            });
                    })
                   
                }
            }
        },
        createdBy: {
            type: Sequelize.STRING,
            allowNull: false
        },
        updatedBy: {
            type: Sequelize.STRING,
            allowNull: false
        },
        tenantId: {
            type: Sequelize.UUID,
            allowNull: true,
            references: {
                model: 'tenants',
                key: 'id'
            }
        },
        tagId: {
            type: Sequelize.STRING,
            allowNull: true,
            references: {
                model: 'tags',
                key: 'id'
            }
        }
    };
}