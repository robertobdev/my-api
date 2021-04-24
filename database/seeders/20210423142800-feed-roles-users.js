'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.bulkInsert(
        'roles_users',
        [
          {
            user_id: 1,
            role_id: 1,
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            user_id: 1,
            role_id: 2,
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            user_id: 1,
            role_id: 3,
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            user_id: 2,
            role_id: 2,
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            user_id: 2,
            role_id: 3,
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            user_id: 3,
            role_id: 2,
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            user_id: 3,
            role_id: 3,
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            user_id: 4,
            role_id: 3,
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            user_id: 5,
            role_id: 3,
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            user_id: 6,
            role_id: 3,
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            user_id: 7,
            role_id: 3,
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            user_id: 8,
            role_id: 3,
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            user_id: 9,
            role_id: 3,
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            user_id: 10,
            role_id: 3,
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            user_id: 11,
            role_id: 3,
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            user_id: 12,
            role_id: 3,
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            user_id: 13,
            role_id: 3,
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            user_id: 14,
            role_id: 3,
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            user_id: 15,
            role_id: 3,
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
    await queryInterface.bulkDelete('roles_users', null, {});
  },
};
