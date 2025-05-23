const express = require("express");
const sequelize = require("./config/database");
const User = require("./models/User");
const Accommodation = require("./models/Accommodation");
const UserRouter = require("./routes/userRoutes");
const AccommodationRouter = require("./routes/accommodationRoutes");
const testConnection = require("./config/database")

testConnection();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

User.hasMany(Accommodation, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});
Accommodation.belongsTo(User, {
  foreignKey: "userId",
});

// Routes
app.use("/users", UserRouter);
app.use("/accommodations", AccommodationRouter); 

app.listen(port, () => {
  console.log(`Server running on port ${PORT}`);
});