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
            person_id: 1,
            login: 'admin@admin.com',
            password:
              '$2b$10$z5V38BrCOClpwf.x7jm2uezhWq3icCS8lR6sKgebDSaEA5.KY6YEq',
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            id: 2,
            person_id: 2,
            login: 'manager@manager.com',
            password:
              '$2b$10$z5V38BrCOClpwf.x7jm2uezhWq3icCS8lR6sKgebDSaEA5.KY6YEq',
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            id: 3,
            person_id: 3,
            login: 'manager1@manager.com',
            password:
              '$2b$10$z5V38BrCOClpwf.x7jm2uezhWq3icCS8lR6sKgebDSaEA5.KY6YEq',
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            id: 4,
            person_id: 4,
            login: 'betinacamiladacruz_@utbr.com.br',
            password:
              '$2b$10$z5V38BrCOClpwf.x7jm2uezhWq3icCS8lR6sKgebDSaEA5.KY6YEq',
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            id: 5,
            person_id: 5,
            login: 'fernandopietronelsonassis-91@atiara.com.br',
            password:
              '$2b$10$z5V38BrCOClpwf.x7jm2uezhWq3icCS8lR6sKgebDSaEA5.KY6YEq',
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            id: 6,
            person_id: 6,
            login: 'levilorenzoramos-81@gruposandino.com.br',
            password:
              '$2b$10$z5V38BrCOClpwf.x7jm2uezhWq3icCS8lR6sKgebDSaEA5.KY6YEq',
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            id: 7,
            person_id: 7,
            login: 'hadass.hadassarebecaalicecortereal@leoshehtman.com.br',
            password:
              '$2b$10$z5V38BrCOClpwf.x7jm2uezhWq3icCS8lR6sKgebDSaEA5.KY6YEq',
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            id: 8,
            person_id: 8,
            login: 'isabelaadrianacarvalho_@elimco.com',
            password:
              '$2b$10$z5V38BrCOClpwf.x7jm2uezhWq3icCS8lR6sKgebDSaEA5.KY6YEq',
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            id: 9,
            person_id: 9,
            login: 'jjessicaluziateixeira@reconciliare.com.br',
            password:
              '$2b$10$z5V38BrCOClpwf.x7jm2uezhWq3icCS8lR6sKgebDSaEA5.KY6YEq',
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            id: 10,
            person_id: 10,
            login: 'marcosviniciuskaiquegaelfernandes@callan.com.br',
            password:
              '$2b$10$z5V38BrCOClpwf.x7jm2uezhWq3icCS8lR6sKgebDSaEA5.KY6YEq',
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            id: 11,
            person_id: 11,
            login: 'jorgemarcosmartins__jorgemarcosmartins@etec.sp.gov.br',
            password:
              '$2b$10$z5V38BrCOClpwf.x7jm2uezhWq3icCS8lR6sKgebDSaEA5.KY6YEq',
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            id: 12,
            person_id: 12,
            login: 'vitoriabeatrizdanielapires_@lnaa.com.br',
            password:
              '$2b$10$z5V38BrCOClpwf.x7jm2uezhWq3icCS8lR6sKgebDSaEA5.KY6YEq',
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            id: 13,
            person_id: 13,
            login: 'eedsonmarcoskaiquelopes@acesse.net',
            password:
              '$2b$10$z5V38BrCOClpwf.x7jm2uezhWq3icCS8lR6sKgebDSaEA5.KY6YEq',
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            id: 14,
            person_id: 14,
            login:
              'enzojoaquimerickdrumond__enzojoaquimerickdrumond@zipmail.com.br',
            password:
              '$2b$10$z5V38BrCOClpwf.x7jm2uezhWq3icCS8lR6sKgebDSaEA5.KY6YEq',
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            id: 15,
            person_id: 15,
            login: 'alexandreosvaldomanuelcarvalho_@tursi.com.br',
            password:
              '$2b$10$z5V38BrCOClpwf.x7jm2uezhWq3icCS8lR6sKgebDSaEA5.KY6YEq',
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
    await queryInterface.bulkDelete('users', null, {});
  },
};
