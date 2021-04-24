'use strict';

module.exports = {
  up: async (queryInterface) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.bulkInsert(
        'contacts',
        [
          {
            person_id: 1,
            contact_type: 'CELULAR',
            value: '(71) 998-577-479',
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            person_id: 1,
            contact_type: 'TWITTER',
            value: '@twitter-admin',
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            person_id: 2,
            contact_type: 'CELULAR',
            value: '(94) 925-073-336',
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            person_id: 2,
            contact_type: 'CELULAR',
            value: '(92) 937-696-796',
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            person_id: 3,
            contact_type: 'CELULAR',
            value: '(92) 987-566-796',
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            person_id: 3,
            contact_type: 'CELULAR',
            value: '(82) 999-685-606',
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            person_id: 4,
            contact_type: 'CELULAR',
            value: '(82) 931-151-606',
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            person_id: 5,
            contact_type: 'CELULAR',
            value: '(42) 936-669-368',
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            person_id: 6,
            contact_type: 'CELULAR',
            value: '(86) 988-133-382',
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            person_id: 7,
            contact_type: 'CELULAR',
            value: '(63) 965-486-006',
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            person_id: 7,
            contact_type: 'CELULAR',
            value: '(63) 999-554-009',
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            person_id: 7,
            contact_type: 'TWITTER',
            value: '@twitter',
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            person_id: 7,
            contact_type: 'FACEBOOK',
            value: '@facebook',
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            person_id: 8,
            contact_type: 'CELULAR',
            value: '(67) 992-533-292',
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            person_id: 9,
            contact_type: 'CELULAR',
            value: '(81) 985-727-845',
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            person_id: 10,
            contact_type: 'CELULAR',
            value: '(11) 943-773-279',
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            person_id: 11,
            contact_type: 'CELULAR',
            value: '(11) 975-800-032',
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            person_id: 12,
            contact_type: 'CELULAR',
            value: '(68) 930-911-911',
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            person_id: 13,
            contact_type: 'CELULAR',
            value: '(43) 988-777-000',
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            person_id: 13,
            contact_type: 'FIXO',
            value: '(62) 3398-4736',
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            person_id: 13,
            contact_type: 'FACEBOOK',
            value: '@facebook-2',
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            person_id: 13,
            contact_type: 'INSTAGRAM',
            value: '@instagram',
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            person_id: 14,
            contact_type: 'CELULAR',
            value: '(62) 978-249-436',
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            person_id: 15,
            contact_type: 'CELULAR',
            value: '(34) 992-150-179',
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
    await queryInterface.bulkDelete('contacts', null, {});
  },
};
