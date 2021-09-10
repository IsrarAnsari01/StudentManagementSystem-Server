"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Role, { foreignKey: "roleId" });
      this.hasMany(models.Students, { as: "student", foreignKey: "user_id" });
      this.hasMany(models.Teachers, { as: "teacher", foreignKey: "user_id" });
    }
  }
  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        min: 5,
        max: 60,
        is: /^[A-Za-z .]+$/i,
      },
      email: {
        type: DataTypes.STRING(50),
        allowNull: false, // This will make it req field
        unique: true,
        isEmail: true,
      },
      password: {
        type: DataTypes.STRING(50),
        allowNull: false, // This will make it req field
        unique: true, // This will make it req field
        min: 6,
        max: 16,
        is: /^(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]+$/i,
      },
      roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onUpdate: "cascade",
        onDelete: "cascade",
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
