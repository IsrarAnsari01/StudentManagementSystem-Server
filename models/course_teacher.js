'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class course_teacher extends Model {
    static associate(models) {
    }
  };
  course_teacher.init({
    teacher_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onUpdate: "cascade",
      onDelete: "cascade",
    },
    course_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onUpdate: "cascade",
      onDelete: "cascade",
    },
  }, {
    sequelize,
    modelName: 'course_teacher',
  });
  return course_teacher;
};