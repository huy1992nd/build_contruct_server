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
        asset_code: {
            type: Sequelize.STRING
        },
        asset_number: {
            type: Sequelize.STRING
        },
        asset_name: {
            type: Sequelize.STRING
        },
        branch_code: {
            type: Sequelize.STRING
        },
        branch_name: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.ENUM,
            allowNull: true,
            values: [StatusEnum.toolsAndEquipmentStatus],
            defaultValue: StatusEnum.ACTIVE,
        },
        description1: {
            type: Sequelize.STRING
        },
        description2: {
            type: Sequelize.STRING
        },
        jkkp_certificate_number: {
            type: Sequelize.STRING
        },
        start_date: {
            type: Sequelize.DATE
        },
        mentainance_due_date: {
            type: Sequelize.STRING
        },
        technician_id: {
            type: Sequelize.STRING
        },
        technician_name: {
            type: Sequelize.STRING
        },
        branch_id: {
            type: Sequelize.STRING
        },
        assignment_branch_id: {
            type: Sequelize.STRING
        },
        assignment_remark: {
            type: Sequelize.STRING
        },
        assignment_date: {
            type: Sequelize.DATE
        },
        return_remark: {
            type: Sequelize.STRING
        },
        return_date_time: {
            type: Sequelize.DATE
        },
        return_time: {
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
    };
}