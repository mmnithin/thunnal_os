const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const passport = require("passport");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Passport middleware
app.use(passport.initialize());
require("./config/passport")(passport);

app.get("/", (req, res) => {
  res.send("API running with Passport JWT");
});

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const storeRoutes = require("./routes/storeRoutes");

app.use("/api/auth", authRoutes);
app.use(
  "/api/users",
  passport.authenticate("jwt", { session: false }),
  userRoutes
);
app.use("/api/stores", storeRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});