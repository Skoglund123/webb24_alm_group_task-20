const express = require("express");
const sequelize = require("./config/database");
const User = require("./models/userModel");
const Accommodation = require("./models/accommodationModel");
const UserRouter = require("./routes/userRoutes");
const AccommodationRouter = require("./routes/accommodationRoutes");
const {testConnection} = require("./config/database");

testConnection();

const app = express();
const PORT = process.env.PORT || 5500;

// Middleware
app.use(express.json());

// Routes
app.use("/users", UserRouter);
app.use("/accommodations", AccommodationRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
