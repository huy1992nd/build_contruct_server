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
        tenantId: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        /** ******************************** Main Address */
        mAddress1: {
            type: Sequelize.STRING,
            allowNull: false
        },
        mAddress2: {
            type: Sequelize.STRING,
            allowNull: true
        },
        mAddress3: {
            type: Sequelize.STRING,
            allowNull: true
        },
        mPostcodeId: {
            type: Sequelize.STRING,
            allowNull: false
        },
        mCityId: {
            type: Sequelize.STRING,
            allowNull: false
        },
        mStateId: {
            type: Sequelize.STRING,
            allowNull: false
        },
        mCountryId: {
            type: Sequelize.STRING,
            allowNull: false
        },
        /** ******************************** Correspondence Address */
        cAddress1: {
            type: Sequelize.STRING,
            // allowNull: false
        },
        cAddress2: {
            type: Sequelize.STRING,
            allowNull: true
        },
        cAddress3: {
            type: Sequelize.STRING,
            allowNull: true
        },
        cPostcodeId: {
            type: Sequelize.STRING,
            // allowNull: false
        },
        cCityId: {
            type: Sequelize.STRING,
            // allowNull: false
        },
        cStateId: {
            type: Sequelize.STRING,
            // allowNull: false
        },
        cCountryId: {
            type: Sequelize.STRING,
            // allowNull: false
        },
        sameAddress: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        /** ******************************** Communication */
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
        /** ******************************** Demographic */
        gender: {
            type: Sequelize.STRING,
            // allowNull: false
        },
        highestEducationId: {
            type: Sequelize.STRING,
            allowNull: true
        },
        occupationId: {
            type: Sequelize.STRING,
            allowNull: true
        },
        employmentSectorId: {
            type: Sequelize.STRING,
            allowNull: true
        },
        industryId: {
            type: Sequelize.STRING,
            allowNull: true
        },
        annualIncomeId: {
            type: Sequelize.STRING,
            allowNull: true
        },
        ethnicityId: {
            type: Sequelize.STRING,
            allowNull: true
        },
        dateOfBirth: {
            type: Sequelize.DATEONLY,
            allowNull: true
        },
        nationality: {
            type: Sequelize.STRING,
            allowNull: true
        },
        maritalStatus: {
            type: Sequelize.STRING,
            allowNull: true
        },
        religionId: {
            type: Sequelize.STRING,
            allowNull: true
        },
        /** PDPA */
        pdpaClause: {
            type: Sequelize.STRING,
            allowNull: true
        },
        pdpaConsent: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        pdpaSignedDate: {
            type: Sequelize.DATEONLY,
            // allowNull: false
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
        companyId: {
            type: Sequelize.UUID,
            // allowNull: false
        },
        /** additional */
        isNeedSpecialAttention: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        isVehicleCollectionSMS: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        isServiceReminderSMS: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        isCampaignSMS: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        /** pdpa */
        isFullConsent: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        isPartialConsent: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        consentA: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        consentB: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        consentC: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        consentD: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        consentE: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        consentF: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        consentG: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        consentH: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        consentI: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        consentJ: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },

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
    };
}