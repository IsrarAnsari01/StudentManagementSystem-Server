"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class IntrestedSubjects extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Students, { foreignKey: "student_id" });
    }
  }
  IntrestedSubjects.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        min: 10,
        max: 100,
        is: /^[A-Za-z .!@#$%^]+$/i,
      },
      student_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onUpdate: "cascade",
        onDelete: "cascade",
      },
    },
    {
      sequelize,
      modelName: "IntrestedSubjects",
    }
  );
  return IntrestedSubjects;
};
