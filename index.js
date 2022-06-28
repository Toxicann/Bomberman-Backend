const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Level = require("./model/level");
const Highscore = require("./model/highscore");

require("dotenv").config();
const source = process.env.DB_CONNSTR;

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

/* This is a route that is used to get all the highscores from the database. */
app.get("/load_highscore", async (req, res) => {
  try {
    const highscores = await Highscore.find();
    res.json(highscores);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* This is a route that is used to create a new highscore in the database. */
app.post("/save_highscore", async (req, res) => {
  try {
    const highscore = new Highscore(req.body);
    await highscore.save();
    res.send(highscore);
  } catch (err) {
    res.send({ message: err });
  }
});

mongoose
  .connect(source, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() =>
    console.log(
      `MongoDB Connected with status ${mongoose.connection.readyState}`
    )
  )
  .catch((err) => console.log(err));

/* This is the port that the server is running on. */
app.listen(3000, () => {
  console.log("connected to port 3000");
});
