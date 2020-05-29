const Sequelize = require("sequelize");
const StatusEnum = require('../enums/Status');

module.exports = () => {
    return {
        createdBy: {
            type: Sequelize.STRING(255),
            allowNull: false
          },
          createdAt: {
            type: Sequelize.DATE,
            allowNull: false
          },
          updatedBy: {
            type: Sequelize.STRING(255),
            allowNull: false
          },
          updatedAt: {
            type: Sequelize.DATE,
            allowNull: false
          },
          deleted: {
            type: Sequelize.INTEGER(1),
            allowNull: false,
            defaultValue: '0'
          },
          status: {
            type: Sequelize.ENUM('enabled','disabled','pending'),
            allowNull: false,
            defaultValue: 'enabled'
          },
          inactivateReason: {
            type: Sequelize.STRING(255),
            allowNull: true
          },
          id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV1
          },
          edisposalId: {
            type: Sequelize.UUID,
            allowNull: false,
            references: {
              model: 'edisposals',
              key: 'id'
            }
          },
          uvRouteId: {
            type: Sequelize.UUID,
            allowNull: true,
         /*    references: {
              model: 'uv_route',
              key: 'id'
            } */
          },
          edCycleId: {
            type: Sequelize.UUID,
            allowNull: true,
            references: {
              model: 'edisposal_cycle',
              key: 'id'
            }
          },
          edRouteId: {
            type: Sequelize.UUID,
            allowNull: true,
            references: {
              model: 'edisposal_route',
              key: 'id'
            }
          },
          createdname: {
            type: Sequelize.STRING(100),
            allowNull: true
          },
          updatedname: {
            type: Sequelize.STRING(100),
            allowNull: true
          },
          isSubmit: {
            type: Sequelize.INTEGER(1),
            allowNull: false,
            defaultValue: '0'
          },
          isEmailRM: {
              type: Sequelize.TINYINT(1),
              allowNull: false,
              defaultValue: false
          },
          isEmailTCUV: {
              type: Sequelize.TINYINT(1),
              allowNull: false,
              defaultValue: false
          },
          nextRouteCode: {
            type: Sequelize.STRING(10),
            allowNull: true
          }
    };
}