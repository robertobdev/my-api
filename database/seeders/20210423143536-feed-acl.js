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
            is_show: 1,
            is_get: 1,
            is_post: 1,
            is_update: 1,
            is_delete: 1,
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            role_id: 1,
            module_id: 2,
            is_show: 1,
            is_get: 1,
            is_post: 1,
            is_update: 1,
            is_delete: 1,
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            role_id: 1,
            module_id: 3,
            is_show: 1,
            is_get: 1,
            is_post: 1,
            is_update: 1,
            is_delete: 1,
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            role_id: 2,
            module_id: 2,
            is_show: 1,
            is_get: 1,
            is_post: 1,
            is_update: 1,
            is_delete: 1,
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            role_id: 2,
            module_id: 3,
            is_show: 1,
            is_get: 1,
            is_post: 1,
            is_update: 1,
            is_delete: 1,
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            role_id: 3,
            module_id: 3,
            is_show: 1,
            is_get: 1,
            is_post: 1,
            is_update: 1,
            is_delete: 1,
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
