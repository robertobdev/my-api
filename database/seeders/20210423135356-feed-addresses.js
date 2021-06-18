'use strict';

module.exports = {
  up: async (queryInterface) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.bulkInsert(
        'addresses',
        [
          {
            zipcode: '41185-635',
            street: 'Vila Noratinha',
            number: '467',
            neighborhood: 'São Gonçalo',
            city: 'Salvador',
            state: 'BA',
            user_id: 1,
            country: 'BRAZIL',
            created_at: new Date(),
            updated_at: new Date(),
          },

          {
            zipcode: '68458-000',
            street: 'Rua Siqueira Campos',
            number: '998',
            neighborhood: 'Jaqueira',
            city: 'Tucuruí',
            state: 'PA',
            user_id: 2,
            country: 'BRAZIL',
            created_at: new Date(),
            updated_at: new Date(),
          },

          {
            zipcode: '69075-288',
            street: 'Beco Oliveira',
            number: '666',
            neighborhood: 'Mauazinho',
            city: 'Manaus',
            state: 'AM',
            user_id: 3,
            country: 'BRAZIL',
            created_at: new Date(),
            updated_at: new Date(),
          },

          {
            zipcode: '57305-754',
            street: 'Rua Rosa Macário de Lima',
            number: '852',
            neighborhood: 'Zélia Barbosa Rocha',
            city: 'Arapiraca',
            state: 'AL',
            user_id: 4,
            country: 'BRAZIL',
            created_at: new Date(),
            updated_at: new Date(),
          },

          {
            zipcode: '85023-410',
            street: 'Rua Miguel Padilha',
            number: '962',
            neighborhood: 'Boqueirão',
            city: 'Guarapuava',
            state: 'PR',
            user_id: 5,
            country: 'BRAZIL',
            created_at: new Date(),
            updated_at: new Date(),
          },

          {
            zipcode: '65636-390',
            street: 'Beco Vinte e Um',
            number: '693',
            neighborhood: 'Parque Piauí',
            city: 'Timon',
            state: 'MA',
            user_id: 6,
            country: 'BRAZIL',
            created_at: new Date(),
            updated_at: new Date(),
          },

          {
            zipcode: '77426-110',
            street: 'Rua 4',
            number: '312',
            neighborhood: 'Loteamento Campo Bello',
            city: 'Gurupi',
            state: 'TO',
            user_id: 7,
            country: 'BRAZIL',
            created_at: new Date(),
            updated_at: new Date(),
          },

          {
            zipcode: '79115-230',
            street: 'Rua Bacurí',
            number: '752',
            neighborhood: 'Coophatrabalho',
            city: 'Campo Grande',
            state: 'MS',
            user_id: 8,
            country: 'BRAZIL',
            created_at: new Date(),
            updated_at: new Date(),
          },

          {
            zipcode: '53401-542',
            street: '2ª Travessa da Roseira',
            number: '638',
            neighborhood: 'Centro',
            city: 'Paulista',
            state: 'PE',
            user_id: 9,
            country: 'BRAZIL',
            created_at: new Date(),
            updated_at: new Date(),
          },

          {
            zipcode: '13255-672',
            street: 'Rua Helios Momente',
            number: '652',
            neighborhood: 'Núcleo Residencial Porto Seguro',
            city: 'Itatiba',
            state: 'SP',
            user_id: 10,
            country: 'BRAZIL',
            created_at: new Date(),
            updated_at: new Date(),
          },

          {
            zipcode: '08270-001',
            street: 'Avenida Afonso de Sampaio e Sousa',
            number: '302',
            neighborhood: 'Itaquera',
            city: 'São Paulo',
            state: 'SP',
            user_id: 11,
            country: 'BRAZIL',
            created_at: new Date(),
            updated_at: new Date(),
          },

          {
            zipcode: '69911-794',
            street: 'Beco do Mangueiral',
            number: '461',
            neighborhood: 'Boa União',
            city: 'Rio Branco',
            state: 'AC',
            user_id: 12,
            country: 'BRAZIL',
            created_at: new Date(),
            updated_at: new Date(),
          },

          {
            zipcode: '86601-032',
            street: 'Rua Frederico Kopke',
            number: '933',
            neighborhood: 'Manoel Müller',
            city: 'Rolândia',
            state: 'PR',
            user_id: 13,
            country: 'BRAZIL',
            created_at: new Date(),
            updated_at: new Date(),
          },

          {
            zipcode: '74984-050',
            street: 'Rua 6',
            number: '173',
            neighborhood: 'Jardim Copacabana',
            city: 'Aparecida de Goiânia',
            state: 'GO',
            user_id: 14,
            country: 'BRAZIL',
            created_at: new Date(),
            updated_at: new Date(),
          },

          {
            zipcode: '38412-694',
            street: 'Rua Fernando Reis Cardoso',
            number: '869',
            neighborhood: 'Morada Nova',
            city: 'Uberlândia',
            state: 'MG',
            user_id: 15,
            country: 'BRAZIL',
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

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('addresses', null, {});
  },
};
