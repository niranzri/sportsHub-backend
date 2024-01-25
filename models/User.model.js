const { Schema, Types, model } = require("mongoose");

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    trim: true,
  },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ["person", "company"], default: "person" },
  company: { type: String, ref: "Company" },
  favourites: [{ type: Types.ObjectId, ref: "Activity" }],
});

const User = model("User", userSchema);

module.exports = User;
