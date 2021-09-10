"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Students", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      class: {
        type: Sequelize.STRING,
        allowNull: false,
        min: 2,
        max: 100,
        is: /^[A-Za-z0-9 .]+$/i,
      },
      joinDate: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      country: {
        type: Sequelize.STRING,
        allowNull: false,
        min: 2,
        max: 200,
        is: /^[A-Za-z0-9 .]+$/i,
      },
      city: {
        type: Sequelize.STRING,
        allowNull: false,
        min: 2,
        max: 200,
        is: /^[A-Za-z0-9 .]+$/i,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "cascade",
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
    await queryInterface.dropTable("Students");
  },
};
