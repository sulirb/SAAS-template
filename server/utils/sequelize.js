const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("database", "username", "password", {
  host: "localhost",
  dialect: "mysql",
});

const User = require("./models/user")(sequelize);

// Sync all models with the database
sequelize
  .sync()
  .then(() => console.log("Database & tables created!"))
  .catch((err) => console.log("Error syncing database:", err));

module.exports = {
  sequelize,
  User,
};
