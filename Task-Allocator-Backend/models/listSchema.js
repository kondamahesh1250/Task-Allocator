const mongoose = require('mongoose');

const listItemSchema = new mongoose.Schema({
  firstName: String,
  phone: String,
  notes: String,
  agent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AgentDetail' // Reference to Agent collection
  }
});

module.exports = mongoose.model('ListItem', listItemSchema);
