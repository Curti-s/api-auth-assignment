'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('personnels', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      personnel_id: {
        type: Sequelize.INTEGER
      },
      personnel_onames: {
        type: Sequelize.STRING
      },
      personnel_fname: {
        type: Sequelize.STRING
      },
      personnel_email: {
        type: Sequelize.STRING
      },
      personnel_phone: {
        type: Sequelize.STRING
      },
      personnel_password: {
        type: Sequelize.STRING
      },
      personnel_status: {
        type: Sequelize.STRING
      },
      last_login: {
        type: Sequelize.DATE
      },
      personnel_type_id: {
        type: Sequelize.INTEGER
      },
      reset_password: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('personnels');
  }
};