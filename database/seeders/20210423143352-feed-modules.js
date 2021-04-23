'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.bulkInsert(
        'modules',
        [
          {
            id: 1,
            title: 'ACL',
            router: '/acl',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: 2,
            title: 'Usuários',
            router: '/users',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: 3,
            title: 'Dashboard',
            router: '/dashboard',
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
    await queryInterface.bulkDelete('modules', null, {});
  },
};
