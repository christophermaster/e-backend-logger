const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authorizationsSchema = new Schema({
  application_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Aplications',
    required: true
  },
  token: {
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
const Authorizations = mongoose.model('Authorizations', authorizationsSchema);

module.exports = Authorizations;