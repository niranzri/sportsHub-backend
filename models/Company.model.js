const { Schema, Types, model } = require("mongoose");

const companySchema = new Schema({
  name: { type: String, required: true },
  city: { type: String, enum: ["Berlin", "Utrecht", "Nantes"] },
  address: { type: String },
  postcode: { type: String },
  image: {
    type: String,
    default:
      "https://media.istockphoto.com/id/1269246333/fr/photo/int%C3%A9rieur-moderne-de-gym-de-luxe.jpg?s=612x612&w=0&k=20&c=Ip6ACzSRTPPtAx-Xpm5Nyyb8_A3qaKnX8S1wqF2GGLU=",
  },
  activities: [{ type: Types.ObjectId, ref: "Activity" }],
  employees: [{ type: Types.ObjectId, ref: "User" }],
});

const Company = model("Company", companySchema);

module.exports = Company;
