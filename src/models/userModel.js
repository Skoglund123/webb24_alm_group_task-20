const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Accommodation = require("./accommodationModel");

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
      validate: {isEmail: true},
  },

    profileImage: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {isUrl: true},
  },
});

User.hasMany(Accommodation, {
  foreignKey: "userId",
  onDelete: "CASCADE", 
});

Accommodation.belongsTo(User, {
  foreignKey: "userId",
});

module.exports = User;
