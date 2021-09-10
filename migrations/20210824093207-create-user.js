"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Users", {
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
        max: 60,
        is: /^[A-Za-z .]+$/i,
      },
      email: {
        type: Sequelize.STRING(50),
        allowNull: false, // This will make it req field
        unique: true,
        isEmail: true,
      },
      password: {
        type: Sequelize.STRING(50),
        allowNull: false, // This will make it req field
        unique: true, // This will make it req field
        min: 6,
        max: 16,
        is: /^(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]+$/i,
      },
      roleId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Roles",  
          key: "id",
        }
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
    await queryInterface.dropTable("Users");
  },
};
