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
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: 2,
            description: 'MANAGER',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: 3,
            description: 'CLIENT',
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
    await queryInterface.bulkDelete('roles', null, {});
  },
};
