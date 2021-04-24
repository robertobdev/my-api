'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.bulkInsert(
        'people',
        [
          {
            name: 'Admin 1',
            cpf: '827.452.287-73',
            email: 'admin@admin.com',
            birthday: '1970-08-09',
            gender: 'MALE',
            avatar:
              'https://thumbs.dreamstime.com/b/opte-pelo-avatar-placeholder-da-foto-%C3%ADcone-do-perfil-124557887.jpg',
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            name: 'Manager',
            cpf: '817.535.687-14',
            email: 'manager@manager.com',
            birthday: '1942-04-05',
            gender: 'MALE',
            avatar:
              'https://thumbs.dreamstime.com/b/opte-pelo-avatar-placeholder-da-foto-%C3%ADcone-do-perfil-124557887.jpg',
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            name: 'Manager 2',
            cpf: '642.045.143-40',
            email: 'manager1@manager.com',
            birthday: '1982-11-14',
            gender: 'FEMALE',
            avatar:
              'https://thumbs.dreamstime.com/b/opte-pelo-avatar-placeholder-da-foto-%C3%ADcone-do-perfil-124557887.jpg',
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            name: 'Betina Camila da Cruz',
            cpf: '335.531.334-30',
            email: 'betinacamiladacruz_@utbr.com.br',
            birthday: '1994-10-27',
            gender: 'FEMALE',
            avatar:
              'https://thumbs.dreamstime.com/b/opte-pelo-avatar-placeholder-da-foto-%C3%ADcone-do-perfil-124557887.jpg',
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            name: 'Fernando Pietro Nelson Assis',
            cpf: '038.201.166-05',
            email: 'fernandopietronelsonassis-91@atiara.com.br',
            birthday: '1983-02-19',
            gender: 'MALE',
            avatar:
              'https://thumbs.dreamstime.com/b/opte-pelo-avatar-placeholder-da-foto-%C3%ADcone-do-perfil-124557887.jpg',
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            name: 'Levi Lorenzo Ramos',
            cpf: '187.451.303-10',
            email: 'levilorenzoramos-81@gruposandino.com.br',
            birthday: '1956-08-15',
            gender: 'MALE',
            avatar:
              'https://thumbs.dreamstime.com/b/opte-pelo-avatar-placeholder-da-foto-%C3%ADcone-do-perfil-124557887.jpg',
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            name: 'Hadassa Rebeca Alice Corte Real',
            cpf: '129.544.577-83',
            email: 'hadass.hadassarebecaalicecortereal@leoshehtman.com.br',
            birthday: '1974-05-15',
            gender: 'FEMALE',
            avatar:
              'https://thumbs.dreamstime.com/b/opte-pelo-avatar-placeholder-da-foto-%C3%ADcone-do-perfil-124557887.jpg',
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            name: 'Isabela Adriana Carvalho',
            cpf: '014.963.509-52',
            email: 'isabelaadrianacarvalho_@elimco.com',
            birthday: '1994-02-23',
            gender: 'FEMALE',
            avatar:
              'https://thumbs.dreamstime.com/b/opte-pelo-avatar-placeholder-da-foto-%C3%ADcone-do-perfil-124557887.jpg',
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            name: 'Jéssica Luzia Teixeira',
            cpf: '062.876.733-11',
            email: 'jjessicaluziateixeira@reconciliare.com.br',
            birthday: '1986-07-26',
            gender: 'FEMALE',
            avatar:
              'https://thumbs.dreamstime.com/b/opte-pelo-avatar-placeholder-da-foto-%C3%ADcone-do-perfil-124557887.jpg',
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            name: 'Marcos Vinicius Kaique Gael Fernandes',
            cpf: '767.133.871-01',
            email: 'marcosviniciuskaiquegaelfernandes@callan.com.br',
            birthday: '1945-07-16',
            gender: 'MALE',
            avatar:
              'https://thumbs.dreamstime.com/b/opte-pelo-avatar-placeholder-da-foto-%C3%ADcone-do-perfil-124557887.jpg',
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            name: 'Jorge Marcos Martins',
            cpf: '463.492.448-00',
            email: 'jorgemarcosmartins__jorgemarcosmartins@etec.sp.gov.br',
            birthday: '1944-12-04',
            gender: 'MALE',
            avatar:
              'https://thumbs.dreamstime.com/b/opte-pelo-avatar-placeholder-da-foto-%C3%ADcone-do-perfil-124557887.jpg',
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            name: 'Vitória Beatriz Daniela Pires',
            cpf: '945.210.802-94',
            email: 'vitoriabeatrizdanielapires_@lnaa.com.br',
            birthday: '1989-11-27',
            gender: 'FEMALE',
            avatar:
              'https://thumbs.dreamstime.com/b/opte-pelo-avatar-placeholder-da-foto-%C3%ADcone-do-perfil-124557887.jpg',
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            name: 'Edson Marcos Kaique Lopes',
            cpf: '400.079.207-50',
            email: 'eedsonmarcoskaiquelopes@acesse.net',
            birthday: '2001-10-04',
            gender: 'MALE',
            avatar:
              'https://thumbs.dreamstime.com/b/opte-pelo-avatar-placeholder-da-foto-%C3%ADcone-do-perfil-124557887.jpg',
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            name: 'Enzo Joaquim Erick Drumond',
            cpf: '339.256.032-47',
            email:
              'enzojoaquimerickdrumond__enzojoaquimerickdrumond@zipmail.com.br',
            birthday: '1992-05-18',
            gender: 'MALE',
            avatar:
              'https://thumbs.dreamstime.com/b/opte-pelo-avatar-placeholder-da-foto-%C3%ADcone-do-perfil-124557887.jpg',
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            name: 'Alexandre Osvaldo Manuel Carvalho',
            cpf: '470.491.453-43',
            email: 'alexandreosvaldomanuelcarvalho_@tursi.com.br',
            birthday: '1981-09-22',
            gender: 'MALE',
            avatar:
              'https://thumbs.dreamstime.com/b/opte-pelo-avatar-placeholder-da-foto-%C3%ADcone-do-perfil-124557887.jpg',
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
    await queryInterface.bulkDelete('people', null, {});
  },
};
