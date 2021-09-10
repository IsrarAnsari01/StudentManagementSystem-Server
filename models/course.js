"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.CourseRegistration, {
        as: "courseDetails",
        foreignKey: "courseId",
      });
      this.belongsToMany(models.Teachers, {
        as: "Teacher",
        through: "courseTeacher",
        foreignKey: "course_id",
      });
      this.belongsToMany(models.Students, {
        as: "Student",
        through: "enroll_student",
        foreignKey: "course_id",
      });
    }
  }
  Course.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        min: 5,
        max: 100,
        is: /^[A-Za-z0-9 .]+$/i,
      },
      class: {
        type: DataTypes.STRING,
        allowNull: false,
        min: 2,
        max: 100,
        is: /^[A-Za-z0-9 .]+$/i,
      },
    },
    {
      sequelize,
      modelName: "Course",
    }
  );
  return Course;
};
