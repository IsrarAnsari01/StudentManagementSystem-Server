const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("studentmanagementsystem", "root", "", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
(() => {
  sequelize
    .authenticate()
    .then(() => console.log("Connected to DB successfully:"))
    .catch((err) => console.log("Error in Connection through sequelize", err));
})();

db.sequelize.sync().then(() => console.log("Re-Sync Successfully"));
module.exports = db;
