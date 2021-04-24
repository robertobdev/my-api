'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.bulkInsert(
        'acl',
        [
          {
            role_id: 1,
            module_id: 1,
            show: 1,
            get: 1,
            post: 1,
            update: 1,
            delete: 1,
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            role_id: 1,
            module_id: 2,
            show: 1,
            get: 1,
            post: 1,
            update: 1,
            delete: 1,
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            role_id: 1,
            module_id: 3,
            show: 1,
            get: 1,
            post: 1,
            update: 1,
            delete: 1,
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            role_id: 2,
            module_id: 2,
            show: 1,
            get: 1,
            post: 1,
            update: 1,
            delete: 1,
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            role_id: 2,
            module_id: 3,
            show: 1,
            get: 1,
            post: 1,
            update: 1,
            delete: 1,
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            role_id: 3,
            module_id: 3,
            show: 1,
            get: 1,
            post: 1,
            update: 1,
            delete: 1,
            created_at: new Date(),
            updated_at: new Date(),
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
