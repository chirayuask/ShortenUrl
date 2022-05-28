'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tables', {
      id: Sequelize.STRING(15),
      topicsName: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      userid: Sequelize.STRING(15),
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
    });
    await queryInterface.createTable('rankings', {
      id: Sequelize.STRING(15),
      rankings: Sequelize.INTEGER,
      tableid: Sequelize.STRING(15),
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
    });
    await queryInterface.createTable('users', {
      id: Sequelize.STRING(15),
      email: Sequelize.STRING(100),
      first_name: Sequelize.STRING(40),
      last_name: Sequelize.STRING(40),
      is_admin: Sequelize.BOOLEAN,
      hash: Sequelize.STRING,
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
    });

    await queryInterface.createTable('urlShortners', {
      id: Sequelize.STRING(15),
      fullURL: Sequelize.STRING,
      identifier: Sequelize.STRING(15),
      clicks: Sequelize.INTEGER,
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('tables');
    await queryInterface.dropTable('rankings');
    await queryInterface.dropTable('users');
    await queryInterface.dropTable('urlShortners');
  }
};
