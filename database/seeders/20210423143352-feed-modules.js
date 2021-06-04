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
            description: 'ACL',
            submenus:
              '{"menus":[{"title":"Criar","router":"register"},{"title":"List","router":"list"}]}',
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            id: 2,
            title: 'Usuários',
            router: '/users',
            description: 'users',
            submenus:
              '{"menus":[{"title":"Criar","router":"register"},{"title":"List","router":"list"}]}',
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            id: 3,
            title: 'Dashboard',
            router: '/dashboard',
            description: 'dashboard',
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
    await queryInterface.bulkDelete('modules', null, {});
  },
};
