const mongoose = require("mongoose");

/* Creating a new schema for the database. */
const Highscore = new mongoose.Schema({
  Highscore: Number,
});

module.exports = mongoose.model("highscore", Highscore);
