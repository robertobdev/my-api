'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.bulkInsert(
        'users',
        [
          {
            id: 1,
            login: 'admin@admin.com',
            password: '',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: 2,
            login: 'manager@manager.com',
            password: '',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: 3,
            login: 'manager1@manager.com',
            password: '',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: 4,
            login: 'betinacamiladacruz_@utbr.com.br',
            password: '',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: 5,
            login: 'fernandopietronelsonassis-91@atiara.com.br',
            password: '',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: 6,
            login: 'levilorenzoramos-81@gruposandino.com.br',
            password: '',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: 7,
            login: 'hadass.hadassarebecaalicecortereal@leoshehtman.com.br',
            password: '',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: 8,
            login: 'isabelaadrianacarvalho_@elimco.com',
            password: '',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: 9,
            login: 'jjessicaluziateixeira@reconciliare.com.br',
            password: '',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: 10,
            login: 'marcosviniciuskaiquegaelfernandes@callan.com.br',
            password: '',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: 11,
            login: 'jorgemarcosmartins__jorgemarcosmartins@etec.sp.gov.br',
            password: '',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: 12,
            login: 'vitoriabeatrizdanielapires_@lnaa.com.br',
            password: '',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: 13,
            login: 'eedsonmarcoskaiquelopes@acesse.net',
            password: '',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: 14,
            login:
              'enzojoaquimerickdrumond__enzojoaquimerickdrumond@zipmail.com.br',
            password: '',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: 15,
            login: 'alexandreosvaldomanuelcarvalho_@tursi.com.br',
            password: '',
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
    await queryInterface.bulkDelete('users', null, {});
  },
};
