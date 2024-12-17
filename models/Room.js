const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  building: { type: String, required: true },
  type: { type: String, required: true },
  capacity: { type: Number, required: true },
  price: { type: Number, required: true },
  availability: { type: Boolean, default: true },
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
