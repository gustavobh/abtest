var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Candidate = require('./candidate');
var Transaction = require('./transaction');

var testSchema = new Schema({
  active:   { type: Boolean, default: true },
  transactionRequired:   { type: Boolean, default: true },
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date, default: null },
  name:   { type: String, trim: true },
  owner: { type: String, trim: true },
  requests: { type: Number, default: 0 },
  samplePercent: { type: Number, default: 100 },
  candidates: [Candidate.schema],
  transactions: [Transaction.schema]
});

var Test = mongoose.model('Test', testSchema);

module.exports = Test;
