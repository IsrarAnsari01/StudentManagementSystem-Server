"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Courses", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        min: 5,
        max: 100,
        is: /^[A-Za-z0-9 .]+$/i,
      },
      class: {
        type: Sequelize.STRING,
        allowNull: false,
        min: 2,
        max: 100,
        is: /^[A-Za-z0-9 .]+$/i,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Courses");
  },
};
