const { Schema, model } = require("mongoose");

const activitySchema = new Schema({
  type: { type: String, required: true },
  schedule: { type: [String] },
  company: { type: String, required: true, ref: "Company" },
});

const Activity = model("Activity", activitySchema);

module.exports = Activity;
