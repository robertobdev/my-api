'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.bulkInsert(
        'roles',
        [
          {
            id: 1,
            description: 'ADMIN',
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            id: 2,
            description: 'MANAGER',
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            id: 3,
            description: 'CLIENT',
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
    await queryInterface.bulkDelete('roles', null, {});
  },
};
