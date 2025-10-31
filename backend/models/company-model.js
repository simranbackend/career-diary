const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  domain: { type: String },
  url: { type: String },
  contact: { type: String },
  applied: { type: Boolean, default: true },
  summary: { type: String },
}, {
  timestamps: true,
  versionKey: false
});

module.exports = mongoose.model('Company', companySchema);
