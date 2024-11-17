const Sequelize = require('sequelize');
  async function up({context: queryInterface}) {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      linkname: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      accessToken: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      isBlocked: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      userType: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      signUpPlatform: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      createdBy: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    });
  }

  async function down({context: queryInterface}) {
    await queryInterface.dropTable('users')
  }


  module.exports = {up, down};