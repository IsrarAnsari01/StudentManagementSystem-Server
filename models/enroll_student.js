'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class enroll_student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  enroll_student.init({
    student_id: {
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
    modelName: 'enroll_student',
  });
  return enroll_student;
};