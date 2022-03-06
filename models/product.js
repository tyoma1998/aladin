const { Schema, model } = require('mongoose');

const schema = new Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  isAuth: { type: Boolean },
});

module.exports = model('product', schema);
