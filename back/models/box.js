const { Schema, model } = require('mongoose');

const schema = new Schema({
  id: { type: Number, required: true },
  src: { type: String },
  background: { type: String },
  x: { type: Number, required: true },
  y: { type: Number, required: true },
  width: { type: Number, required: true },
  heigth: { type: Number, required: true },
  rotation: { type: Number, required: true },
  urlParams: { type: Object, required: true },
  type: { type: String, required: true },
  scaleX: { type: Number, required: true },
  scaleY: { type: Number, required: true },
});

module.exports = model('box', schema);
