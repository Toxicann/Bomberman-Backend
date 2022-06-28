const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Level = require("./model/level");

require("dotenv/config");

const app = express();

const db = mongoose.connection;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("connected to db");
});

app.get("/load_level", async (req, res) => {
  try {
    const levels = await Level.find();
    res.json(levels);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/load_level/:id", async (req, res) => {
  try {
    const levels = await Level.findOne({ level_name: req.params.id });
    res.json(levels);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/create_level", async (req, res) => {
  try {
    const gameLevel = new Level(req.body);
    await gameLevel.save();
    res.send(gameLevel);
  } catch (err) {
    res.send({ message: err });
  }
});

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

mongoose.connect(process.env.DB_CONNECTIONSTR, (req, res) => {
  console.log("connected");
});

app.listen(3000, () => {
  console.log("connected to port 3000");
});
