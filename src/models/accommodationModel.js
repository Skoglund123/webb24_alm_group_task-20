const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Accommodation = sequelize.define("Accommodation", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  postalCode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rent: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: { min: 1 },
  },
  rooms: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: { min: 1 },
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

module.exports = Accommodation;
