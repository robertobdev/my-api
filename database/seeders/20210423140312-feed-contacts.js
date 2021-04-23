'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.bulkInsert(
        'contacts',
        [
          {
            personId: 1,
            contact_type: 'CELULAR',
            value: '(71) 998-577-479',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            personId: 1,
            contact_type: 'TWITTER',
            value: '@twitter-admin',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            personId: 2,
            contact_type: 'CELULAR',
            value: '(94) 925-073-336',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            personId: 2,
            contact_type: 'CELULAR',
            value: '(92) 937-696-796',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            personId: 3,
            contact_type: 'CELULAR',
            value: '(92) 987-566-796',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            personId: 3,
            contact_type: 'CELULAR',
            value: '(82) 999-685-606',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            personId: 4,
            contact_type: 'CELULAR',
            value: '(82) 931-151-606',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            personId: 5,
            contact_type: 'CELULAR',
            value: '(42) 936-669-368',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            personId: 6,
            contact_type: 'CELULAR',
            value: '(86) 988-133-382',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            personId: 7,
            contact_type: 'CELULAR',
            value: '(63) 965-486-006',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            personId: 7,
            contact_type: 'CELULAR',
            value: '(63) 999-554-009',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            personId: 7,
            contact_type: 'TWITTER',
            value: '@twitter',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            personId: 7,
            contact_type: 'FACEBOOK',
            value: '@facebook',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            personId: 8,
            contact_type: 'CELULAR',
            value: '(67) 992-533-292',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            personId: 9,
            contact_type: 'CELULAR',
            value: '(81) 985-727-845',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            personId: 10,
            contact_type: 'CELULAR',
            value: '(11) 943-773-279',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            personId: 11,
            contact_type: 'CELULAR',
            value: '(11) 975-800-032',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            personId: 12,
            contact_type: 'CELULAR',
            value: '(68) 930-911-911',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            personId: 13,
            contact_type: 'CELULAR',
            value: '(43) 988-777-000',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            personId: 13,
            contact_type: 'FIXO',
            value: '(62) 3398-4736',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            personId: 13,
            contact_type: 'FACEBOOK',
            value: '@facebook-2',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            personId: 13,
            contact_type: 'INSTAGRAM',
            value: '@instagram',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            personId: 14,
            contact_type: 'CELULAR',
            value: '(62) 978-249-436',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            personId: 15,
            contact_type: 'CELULAR',
            value: '(34) 992-150-179',
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
    await queryInterface.bulkDelete('contacts', null, {});
  },
};
