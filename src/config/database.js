const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();

let sequelize;

if (process.env.NODE_ENV !== "test") {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: process.env.DB_PATH,
    logging: false, // Set to console.log to see SQL queries
  });
} else {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: ":memory:",
    logging: false, // Set to console.log to see SQL queries
  });
}

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");

    await sequelize.sync({ force: true });
    console.log("Database synchronized");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

module.exports = {sequelize, testConnection};