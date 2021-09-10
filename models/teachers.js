"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Teachers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.Course, {
        as: "course",
        through: "courseTeacher",
        foreignKey: "teacher_id",
      });
      this.belongsTo(models.User, { foreignKey: "user_id" });
    }
  }
  Teachers.init(
    {
      education: {
        type: DataTypes.STRING,
        allowNull: false,
        min: 4,
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
        min: 4,
        max: 100,
        is: /^[A-Za-z0-9 .]+$/i,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
        min: 4,
        max: 100,
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
      modelName: "Teachers",
    }
  );
  return Teachers;
};
