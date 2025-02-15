'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  // theem du lieu
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'admin@gmail.com',
        password: '123456',
        firstName: 'Jonh',
        lastName: 'Wick',
        address: 'HN',
        gender: 1,
        typeRole: 'ROLE',
        key: 'R1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
  },
  // chay khi rollback
  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
