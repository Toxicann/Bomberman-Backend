const mongoose = require("mongoose");

/* Creating a new schema for the database. */
const Level = new mongoose.Schema({
  level_name: String,
  walls: Array,
  bricks: Array,
  enemy: Array,
  player: Object,
  door: Object,
});

module.exports = mongoose.model("level", Level);
