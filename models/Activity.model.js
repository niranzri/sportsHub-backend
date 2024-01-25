const { Schema, model, Types } = require("mongoose");

const activitySchema = new Schema({
  type: { type: String, required: true },

  schedule: { type: [String] },

  company: { type: Types.ObjectId, required: true, ref: "company" },
});

const Activity = model("Activity", activitySchema);

module.exports = Activity;
