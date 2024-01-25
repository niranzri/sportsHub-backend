const Activity = require("../models/Activity.model");
const router = require("express").Router();
const { isAuthenticated } = require("../middlewares/route-guard.middleware");

// Starting with /api/activities
router.get("/", async (req, res) => {
  // Get the activities from the DB, using the model
  try {
    const activities = await Activity.find().populate("company");
    res.status(200).json(activities);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error while getting activities" });
  }
});

// GET one
router.get("/:activityId", async (req, res) => {
  const { activityId } = req.params;
  try {
    const oneActivity = await Activity.findById(activityId);
    res.status(200).json(oneActivity);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error while getting the activity" });
  }
});

// POST one
router.post("/", async (req, res) => {
  const payload = req.body;

  try {
    const createdActivity = await Activity.create(payload);
    res.status(201).json(createdActivity);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error while creating the activity" });
  }
});

module.exports = router;
