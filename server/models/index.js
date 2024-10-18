const { Sequelize } = require("sequelize");
const userModel = require("./user");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false, // Set to console.log to see the SQL queries
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

const User = userModel(sequelize);

module.exports = {
  sequelize,
  User,
};
