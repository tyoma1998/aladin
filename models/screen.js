const { Schema, model } = require('mongoose');

const screen = new Schema({
  id: { type: Number, required: true },
  userId: { type: Number, required: true },
  date: { type: String, required: true },
  data: { type: Object,required: true },
});

module.exports = model('screen', screen, 'screen-data');
