const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const logsSchema = new Schema({
  application_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Aplications',
    required: true
  },
  type: {
    type: String,
    enum: ['error', 'info', 'warning'],
    required: true
  },
  priority: {
    type: String,
    enum: ['lowest', 'low', 'medium', 'high', 'highest'],
    required: true
  },
  path: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  request: { data: { type: mongoose.Schema.Types.Mixed }, created_at: { type: Date, default: Date.now } },
  response: { data: { type: mongoose.Schema.Types.Mixed }, created_at: { type: Date, default: Date.now } },
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
const Logs = mongoose.model('Logs', logsSchema);

module.exports = Logs;