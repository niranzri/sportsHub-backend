/*Name: string

City: string

Address: string

Image: img

Employee: array of strings (link to User model - aka ids)*/

const { Schema, model } = require("mongoose");

const companySchema = new Schema({
  name: { type: String, required: true, lowercase: true },
  city: { type: String, enum: ["Berlin", "Utrecht", "Nantes"] },
  address: { type: String },
  image: { type: String },
  employee: { type: [String], ref: "User" },
});

const Company = model("Company", companySchema);

module.exports = Company;
