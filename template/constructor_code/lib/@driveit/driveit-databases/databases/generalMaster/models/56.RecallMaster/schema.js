/*jshint esversion: 9 */
const Sequelize = require("sequelize");
const StatusEnum = require('../enums/Status');
const SilentRecallStatusEnum = require('../enums/silentRecallStatus');
const errorDef = require('../../../../utils/error.codes');


module.exports = () => {
    return {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV1
        },
        makeId: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        makeName: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        internalNo: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        recallRefNo: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        info: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        recallValidFrom: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        recallValidTo: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        warrantyCategoryId: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        warrantyCategoryName: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        symptomCodeId: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        symptomCodeName: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        troubleCodeId: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        troubleCodeName: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        warrantyProfileId: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        warrantyClaimTypeId: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        warrantyClaimTypeName: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        warrantySymptomCategoryId: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        warrantyClassCodeId: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        sourceofProblemId: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        pncCode: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        defectivePartNo: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        reImburserNo: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        reImburserNoId: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        silentRecallStatus: {
            type: Sequelize.ENUM,
            allowNull: false,
            defaultValue: SilentRecallStatusEnum.ENABLED,
            values: [SilentRecallStatusEnum.status]
        },
        status: {
            type: Sequelize.ENUM,
            allowNull: false,
            defaultValue: StatusEnum.ENABLED,
            values: [StatusEnum.status],
        },
        inactivateReason: {
            type: Sequelize.STRING,
            allowNull: true
        },
        deleted: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        createdBy: {
            type: Sequelize.STRING,
            allowNull: false
        },
        updatedBy: {
            type: Sequelize.STRING,
            allowNull: false
        }
    };
};