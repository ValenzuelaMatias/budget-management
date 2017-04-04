let mongoose = require('mongoose');

var schema = mongoose.Schema({
  client: {
    type: String,
    required: true
  },

  state: {
    type: String,
    required: false
  },

  title: {
    type: String,
    required: true
  },

  total_price: {
    type: Number,
    required: true
  },

  items: [{}]

}, { collection: 'budgets' });

mongoose.model('Budgets', schema);
