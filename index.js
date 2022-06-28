const express = require("express");
const mongoose = require("mongoose");
var cors = require("cors");

const Level = require("./model/level");

require("dotenv/config");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("connected to db");
});

app.get("/create_level", async (req, res) => {
  try {
    const levels = await Level.find();
    res.json(levels);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/create_level/:id", async (req, res) => {
  try {
    const levels = await Level.findOne({ level_name: req.params.id });
    res.json(levels);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.delete("/create_level/:id", async (req, res) => {
  try {
    const levels = await Level.deleteOne({
      level_name: req.params.id,
    });
    res.send("complete");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/create_level", async (req, res) => {
  try {
    const gameLevel = new Level(req.body);
    // console.log(gameLevel);
    await gameLevel.save();
    res.send(gameLevel);
  } catch (err) {
    res.send({ message: err });
  }
});

mongoose.connect(process.env.DB_CONNECTIONSTR, (req, res) => {
  console.log("connected");
});

app.listen(3000, () => {
  console.log("connected to port 3000");
});
