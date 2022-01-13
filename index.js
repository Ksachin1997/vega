const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const mongoose = require("mongoose");

const config = require("./helper/config");
const user = require("./module/user/route/user");

const app = express();

/*
 * Connecting to MongoDB using mongoose
 */
mongoose.connect(
  "mongodb://" + config.db.host + ":" + config.db.port + "/" + config.db.name,
  { useNewUrlParser: true }
);
let db = mongoose.connection;

if (!db) {
  console.log("Error connecting db");
} else {
  console.log("Db connected successfully");
}

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/user", user);

app.get("/", (req, res) => res.status(200).json({ heartbeat: 200 }));
app.use("/user", user);

app.listen(config.app.port, () =>
  console.log(`OFM_Backend running on port ${config.app.port}`)
);
