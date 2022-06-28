const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Level = require("./model/level");

require("dotenv/config");

const app = express();

const db = mongoose.connection;

app.use(cors());
app.use(express.json());

/* This is a route that is used to check if the server is connected to the database. */
app.get("/", (req, res) => {
  res.send("connected to db");
});

/* This is a route that is used to get all the levels from the database. */
app.get("/load_level", async (req, res) => {
  try {
    const levels = await Level.find();
    res.json(levels);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* This is a route that is used to get a specific level from the database. */
app.get("/load_level/:id", async (req, res) => {
  try {
    const levels = await Level.findOne({ level_name: req.params.id });
    res.json(levels);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* This is a route that is used to create a new level in the database. */
app.post("/create_level", async (req, res) => {
  try {
    const gameLevel = new Level(req.body);
    await gameLevel.save();
    res.send(gameLevel);
  } catch (err) {
    res.send({ message: err });
  }
});

/* This is a route that is used to delete a specific level from the database. */
app.delete("/delete_level/:id", async (req, res) => {
  try {
    const levels = await Level.deleteOne({
      level_name: req.params.id,
    });
    res.send("complete");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* This is connecting to the database. */
mongoose.connect(process.env.DB_CONNECTIONSTR, (req, res) => {
  console.log("connected");
});

/* This is the port that the server is running on. */
app.listen(3000, () => {
  console.log("connected to port 3000");
});
