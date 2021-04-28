'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface
      .createTable('acl', {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          unique: true,
          primaryKey: true,
        },
        role_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'roles',
            key: 'id',
          },
          onDelete: 'cascade',
          onUpdate: 'cascade',
        },
        module_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'modules',
            key: 'id',
          },
          onDelete: 'cascade',
          onUpdate: 'cascade',
        },
        is_show: {
          type: Sequelize.BOOLEAN,
          defaultValue: true,
          allowNull: false,
        },
        is_get: {
          type: Sequelize.BOOLEAN,
          defaultValue: true,
          allowNull: false,
        },
        is_post: {
          type: Sequelize.BOOLEAN,
          defaultValue: true,
          allowNull: false,
        },
        is_update: {
          type: Sequelize.BOOLEAN,
          defaultValue: true,
          allowNull: false,
          comment: 'ITS MEANS PUT AND PATCH HTTP METHOD',
        },
        is_delete: {
          type: Sequelize.BOOLEAN,
          defaultValue: true,
          allowNull: false,
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
      })
      .then(async () => {
        await queryInterface.addIndex('acl', ['module_id', 'role_id'], {
          type: 'unique',
        });
      });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('acl');
  },
};
