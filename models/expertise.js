"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Expertise extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Teachers, { foreignKey: "teacher_id" });
    }
  }
  Expertise.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        min: 10,
        max: 100,
        is: /^[A-Za-z .!@#$%^]+$/i,
      },
      teacher_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onUpdate: "cascade",
        onDelete: "cascade",
      },
    },
    {
      sequelize,
      modelName: "Expertise",
    }
  );
  return Expertise;
};
