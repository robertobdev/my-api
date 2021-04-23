'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('acl', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
      },
      roleId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'roles',
          key: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
      },
      moduleId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'modules',
          key: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
      },
      show: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
      get: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
      post: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
      update: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false,
        comment: 'ITS MEANS PUT AND PATCH HTTP METHOD',
      },
      delete: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('acl');
  },
};
