const mongoose = require("mongoose");

const Level = new mongoose.Schema({
  level_name: String,
  walls: Array,
  bricks: Array,
  enemy: Array,
  player: Object,
  door: Object,
});

module.exports = mongoose.model("level", Level);
