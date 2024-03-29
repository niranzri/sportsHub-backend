const { Schema, model, Types } = require("mongoose");

const activitySchema = new Schema({
  type: { type: String, required: true },
  schedule: { type: [String] },
  image: { type: String },
  company: { type: Types.ObjectId, ref: "Company" },
});

const Activity = model("Activity", activitySchema);

module.exports = Activity;
