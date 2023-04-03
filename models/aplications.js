const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const aplicationsSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

// Crear el modelo
const Aplications = mongoose.model('Aplications', aplicationsSchema);

module.exports = Aplications;