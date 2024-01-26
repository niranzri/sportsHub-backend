const { Schema, Types, model } = require("mongoose");

const userSchema = new Schema({
  name: {type: String},
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    trim: true,
  },
  passwordHash: { type: String, required: true },
  company: { type: Types.ObjectId, ref: "Company" }
});

const User = model("User", userSchema);

module.exports = User;

// role: { type: String, enum: ["person", "company"], default: "person" },
// favourites: [{ type: Types.ObjectId, ref: "Activity" }]} 