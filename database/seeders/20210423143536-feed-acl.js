'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.bulkInsert(
        'acl',
        [
          {
            roleId: 1,
            moduleId: 1,
            show: 1,
            get: 1,
            post: 1,
            update: 1,
            delete: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            roleId: 1,
            moduleId: 2,
            show: 1,
            get: 1,
            post: 1,
            update: 1,
            delete: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            roleId: 1,
            moduleId: 3,
            show: 1,
            get: 1,
            post: 1,
            update: 1,
            delete: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            roleId: 2,
            moduleId: 2,
            show: 1,
            get: 1,
            post: 1,
            update: 1,
            delete: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            roleId: 2,
            moduleId: 3,
            show: 1,
            get: 1,
            post: 1,
            update: 1,
            delete: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            roleId: 3,
            moduleId: 3,
            show: 1,
            get: 1,
            post: 1,
            update: 1,
            delete: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        {
          transaction,
        },
      );

      await transaction.commit();
    } catch (e) {
      console.log(e);
      await transaction.rollback();
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('acl', null, {});
  },
};
