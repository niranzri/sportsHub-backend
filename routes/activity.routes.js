const Activity = require("../models/Activity.model");
const router = require("express").Router();
const { isAuthenticated } = require("../middlewares/route-guard.middleware");
const Company = require("../models/Company.model");

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

// PUT one
router.put(
  "/:activityId",
  /*isAuthenticated,*/ async (req, res) => {
    // const { userId } = req.tokenPayload;
    const payload = req.body;
    const { activityId } = req.params;
    try {
      const activityToUpdate = await Activity.findById(activityId);
      //   if (activityToUpdate.company == userId) {
      const updatedActivity = await Activity.findByIdAndUpdate(
        activityId,
        payload,
        { new: true }
      );
      res.status(200).json(updatedActivity);
      /* } else {
      res.status(403).json({ message: "you are not the right user" });
    }*/
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "error while updating the activity" });
    }
  }
);
// DELETE one
router.delete(
  "/:activityId",
  /*isAuthenticated,*/ async (req, res) => {
    //  const { userId } = req.tokenPayload;
    const { activityId } = req.params;
    try {
      const activityToDelete = await Activity.findById(activityId);

      //  if (activityToDelete.company == userId) {
      console.log("Deleting");
      await Activity.findByIdAndDelete(activityId);
      res.status(204).json();
      /* } else {
      res.status(403).json({ message: "you are not the right user" });
    }*/
    } catch (error) {
      res.status(500).json({ message: "error while deleting the book" });
    }
  }
);

module.exports = router;
