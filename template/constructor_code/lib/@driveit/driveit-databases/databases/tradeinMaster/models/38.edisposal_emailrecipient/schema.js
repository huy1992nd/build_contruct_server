const Sequelize = require("sequelize");
const StatusEnum = require('../enums/Status');

module.exports = () => {
    return {
        createdBy: {
            type: Sequelize.STRING(255),
            allowNull: true
          },
          createdAt: {
            type: Sequelize.DATE,
            allowNull: true
          },
          updatedBy: {
            type: Sequelize.STRING(255),
            allowNull: true
          },
          updatedAt: {
            type: Sequelize.DATE,
            allowNull: true
          },
          id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV1
          },
          edisposalId: {
            type: Sequelize.CHAR(36),
            allowNull: true,
            references: {
              model: 'edisposals',
              key: 'id'
            }
          },
          edCycleId: {
            type: Sequelize.CHAR(36),
            allowNull: true,
            references: {
              model: 'edisposal_cycle',
              key: 'id'
            }
          },
          edRouteId: {
            type: Sequelize.CHAR(36),
            allowNull: true,
            references: {
              model: 'edisposal_route',
              key: 'id'
            }
          },
          uvRouteId: {
            type: Sequelize.CHAR(36),
            allowNull: true,
            references: {
              model: 'uv_route',
              key: 'id'
            }
          },
          routeCode: {
            type: Sequelize.CHAR(10),
            allowNull: true
          },
          uvEmailListId: {
            type: Sequelize.CHAR(36),
            allowNull: true,
            references: {
              model: 'uv_email_list',
              key: 'id'
            }
          },
          email: {
            type: Sequelize.STRING(1000),
            allowNull: true
          },
          name: {
            type: Sequelize.STRING(100),
            allowNull: true
          },
          deleted: {
            type: Sequelize.TINYINT,
            allowNull: false
          }
    };
}