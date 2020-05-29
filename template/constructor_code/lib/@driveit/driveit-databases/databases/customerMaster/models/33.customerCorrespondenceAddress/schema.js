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
        address1: {
            type: Sequelize.STRING,
            // allowNull: false
        },
        address2: {
            type: Sequelize.STRING,
            allowNull: true
        },
        address3: {
            type: Sequelize.STRING,
            allowNull: true
        },
        postcodeId: {
            type: Sequelize.STRING,
            // allowNull: false
        },
        cityId: {
            type: Sequelize.STRING,
            // allowNull: false
        },
        stateId: {
            type: Sequelize.STRING,
            // allowNull: false
        },
        countryId: {
            type: Sequelize.STRING,
            // allowNull: false
        },
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
            // allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            // allowNull: false
        },
        preferedModeOfContactId: {
            type: Sequelize.STRING,
            // allowNull: false
        },
        receiveSMS: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: true
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
        customerDetailsId: {
            type: Sequelize.UUID,
            references: {
                model: "customerDetails",
                key: "id",
            }
        }
    };
}