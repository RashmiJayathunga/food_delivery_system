const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: { type: String },
  email: { type: String, unique: true, sparse: true },
  password: { type: String },
  cognitoSub: { type: String, unique: true, sparse: true }, // for AWS Cognito users
});

module.exports = mongoose.model("User", userSchema);
