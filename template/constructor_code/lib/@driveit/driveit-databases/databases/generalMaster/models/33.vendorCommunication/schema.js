const Sequelize = require("sequelize");
const StatusEnum = require('../enums/Status');
const errorDef = require('../../../../utils/error.codes');

module.exports = () => {
    return {
        vendorId: {
            type: Sequelize.STRING,
            primaryKey: true,
            //defaultValue: Sequelize.UUIDV1
        },
        address1: {
            type: Sequelize.STRING,
            allowNull: false
        },
        address2: {
            type: Sequelize.STRING
        },
        address3: {
            type: Sequelize.STRING
        },
        cityId: {
            type: Sequelize.STRING,
            allowNull: false
        },
        postcodeId: {
            type: Sequelize.UUID,
            allowNull: false
        },
        stateId: {
            type: Sequelize.STRING,
            allowNull: false
        },
        countryId: {
            type: Sequelize.UUID,
            allowNull: false
        },
        communicationTelephone: {
            type: Sequelize.STRING,
            allowNull: false
        },

        telCode: {
            type: Sequelize.STRING,
            allowNull: true
        },

        communicationFax: {
            type: Sequelize.STRING
        },

        faxCode: {
            type: Sequelize.STRING,
            allowNull: true
        },

        communicationEmail: {
            type: Sequelize.STRING
        },


        contactPersonSaluationId: {
            type: Sequelize.STRING
        },
        contactPersonName: {
            type: Sequelize.STRING
        },
        contactPersonFunction: {
            type: Sequelize.STRING
        },
        contactPersonDept: {
            type: Sequelize.STRING
        },

        cTelCode: {
            type: Sequelize.STRING,
            allowNull: true
        },
        contactPersonTelephone: {
            type: Sequelize.STRING
        },

        contactPersonExtension: {
            type: Sequelize.STRING
        },
        
        cFaxCode: {
            type: Sequelize.STRING
        },

        contactPersonFax: {
            type: Sequelize.STRING
        },
        contactPersonEmail: {
            type: Sequelize.STRING
        },
        createdBy: {
            type: Sequelize.STRING,
            allowNull: false
        },
        updatedBy: {
            type: Sequelize.STRING,
            allowNull: false
        },
        deleted: {
            type: Sequelize.BOOLEAN
        }
    }
}