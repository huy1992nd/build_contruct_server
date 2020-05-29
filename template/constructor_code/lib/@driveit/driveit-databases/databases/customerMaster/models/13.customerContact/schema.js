const Sequelize = require("sequelize");
const StatusEnum = require('../enums/Status');
const errorDef = require('../../../../utils/error.codes');

module.exports = () => {
    return {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV1
        },
        // customerDetailsId: {
        //     type: Sequelize.STRING,
        //     allowNull: false,
        // },
        customerId: {
            type: Sequelize.STRING,
            allowNull: false
        },
        tenantId: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        /** ******************************** Correspondence Address */
        salutationId: {
            type: Sequelize.STRING,
            allowNull: false
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },

        // relationshipId: {
        //     type: Sequelize.STRING,
        //     allowNull: false
        // },

        /** ******************************** Communication */
        telCode: {
            type: Sequelize.STRING,
            allowNull: true
        },

        faxCode: {
            type: Sequelize.STRING,
            allowNull: true
        },
        
        mobileCode: {
            type: Sequelize.STRING,
            allowNull: true
        },
        
        telephone: {
            type: Sequelize.STRING,
            allowNull: true
        },
        fax: {
            type: Sequelize.STRING,
            allowNull: true
        },
        mobile: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false
        },
        /** ******************************** Standard Fields */
        status: {
            type: Sequelize.ENUM,
            allowNull: false,
            defaultValue: StatusEnum.ENABLED,
            values: [StatusEnum.status],
        },
        deleted: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        inactivateReason: {
            type: Sequelize.STRING,
            // allowNull: false
        },
        createdBy: {
            type: Sequelize.STRING,
            allowNull: false
        },
        updatedBy: {
            type: Sequelize.STRING,
            allowNull: false
        },
        mareaOperatorCode: {
            type: Sequelize.STRING,
            allowNull: true
        },
        fareaOperatorCode: {
            type: Sequelize.STRING,
            allowNull: true
        },
        tareaOperatorCode: {
            type: Sequelize.STRING,
            allowNull: true
        }
    };
}