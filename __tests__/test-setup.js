// test-setup.js
process.env.NODE_ENV = "test";
const { sequelize } = require("../src/config/database");
const User = require("../src/models/userModel");
const Accommodation = require("../src/models/accommodationModel");

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterEach(async () => {
  await Accommodation.destroy({ where: {} });
});

afterAll(async () => {
  await sequelize.close();
});

module.exports = { sequelize, User, Accommodation };
