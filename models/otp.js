const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  code: {
    type: String,
  },
  expiresIn: {
    type: Number,
  },
});
const newOtp = mongoose.model("newOtp", otpSchema);
module.exports = newOtp;
