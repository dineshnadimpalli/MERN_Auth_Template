const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const cors = require("cors");
const UserRoute = require("./routes/api/users");
const passportConfig = require("./config/passport");
//Express middleware
const app = express();

// DB Config
const db = require("./config/keys").mongoURI;
// Port Number
const port = process.env.PORT || 8000; // process.env.port is Heroku's port if you choose to deploy the app there

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() =>
    console.log("MongoDB successfully connected to the authenticated mongodb")
  )
  .catch(err => console.log(err));

// Bodyparser middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
// Passport middleware
app.use(passport.initialize());
// Passport config
passportConfig(passport);

// Routes
app.use("/api/users", UserRoute);

app.listen(port, () => {
  console.log(`Server up and running on port ${port} !`);
});
