"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Students extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.Course, {
        as: "Course",
        through: "enroll_student",
        foreignKey: "student_id",
      });
      this.belongsTo(models.User, { foreignKey: "user_id" });
    }
  }
  Students.init(
    {
      class: {
        type: DataTypes.STRING,
        allowNull: false,
        min: 2,
        max: 100,
        is: /^[A-Za-z0-9 .]+$/i,
      },
      joinDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false,
        min: 2,
        max: 200,
        is: /^[A-Za-z0-9 .]+$/i,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
        min: 2,
        max: 200,
        is: /^[A-Za-z0-9 .]+$/i,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onUpdate: "cascade",
        onDelete: "cascade",
      },
    },
    {
      sequelize,
      modelName: "Students",
    }
  );
  return Students;
};
