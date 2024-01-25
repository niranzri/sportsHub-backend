const { Schema, Types, model } = require("mongoose");

const companySchema = new Schema({
  name: { type: String, required: true },
  city: { type: String, enum: ["Berlin", "Utrecht", "Nantes"] },
  address: { type: String },
  postcode: { type: String }, 
  image: { type: String },
  employee: [{ type: Types.ObjectId, ref: "User" }],
});

const Company = model("Company", companySchema);

module.exports = Company;
