/*Username: string

E-mail: string

Password: string

Role: string (enum: ‘person’/’company’)

Company: string, ref to Company model.

Favourites: array of strings, ref to Activity model (aka with the activities id)*/

const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  email: { type: String, required: true, lowercase: true, unique: true },
  hashedPassword: { type: String, required: true },
  roles: { type: String, enum: ["PERSON", "COMPANY"], default: "PERSON" },
  company: { type: String, ref: "Company" },
  favourites: { type: [Types.ObjectId], ref: "Activity" },
});

const User = model("User", userSchema);

module.exports = User;
