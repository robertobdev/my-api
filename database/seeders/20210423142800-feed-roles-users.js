'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.bulkInsert(
        'roles_users',
        [
          {
            userId: 1,
            roleId: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            userId: 1,
            roleId: 2,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            userId: 1,
            roleId: 3,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            userId: 2,
            roleId: 2,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            userId: 2,
            roleId: 3,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            userId: 3,
            roleId: 2,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            userId: 3,
            roleId: 3,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            userId: 4,
            roleId: 3,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            userId: 5,
            roleId: 3,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            userId: 6,
            roleId: 3,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            userId: 7,
            roleId: 3,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            userId: 8,
            roleId: 3,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            userId: 9,
            roleId: 3,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            userId: 10,
            roleId: 3,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            userId: 11,
            roleId: 3,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            userId: 12,
            roleId: 3,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            userId: 13,
            roleId: 3,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            userId: 14,
            roleId: 3,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            userId: 15,
            roleId: 3,
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
    await queryInterface.bulkDelete('roles_users', null, {});
  },
};
