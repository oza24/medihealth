const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  subject: String,
  message: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('contacts', contactSchema);
