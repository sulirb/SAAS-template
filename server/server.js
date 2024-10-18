const express = require("express");
const cors = require("cors");
const { sequelize, testConnection } = require("./config/database");
const routes = require("./routes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", routes);

// Test database connection
testConnection();

// Sync models and start server
const PORT = process.env.PORT || 5000;

sequelize
  .sync({ force: false })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Unable to sync database:", err);
  });
