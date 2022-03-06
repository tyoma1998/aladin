const { Schema, model } = require("mongoose");

const event = new Schema({
  id: { type: Number, required: true },
  number: { type: Number, required: true },
  question: { type: String, required: true },
  data: { type: Array, required: true },
});

module.exports = model("event", event, "event-data");
