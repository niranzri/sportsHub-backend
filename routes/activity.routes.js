const Activity = require("../models/Activity.model");
const router = require("express").Router();
const { isAuthenticated } = require("../middlewares/route-guard.middleware");
const Company = require("../models/Company.model");

// Starting with /api/activities - FE: CompanyProfilePage
router.get("/", async (req, res) => {
  try {
    const activities = await Activity.find().populate("company");

    res.status(200).json(activities);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error while getting activities" });
  }
});

// GET one activity - FE: CompanyActivityDetailsPage
router.get("/:activityId", async (req, res) => {
  const { activityId } = req.params;
  try {
    const oneActivity = await Activity.findById(activityId).populate("company");
    res.status(200).json(oneActivity);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error while getting the activity" });
  }
});

router.get("/company/:company", async (req, res, next) => {
  const { company } = req.params;

  console.log(company);
  Activity.find({ company })
    .populate("company")
    .then((activities) => {
      res.status(200).json(activities);
    })
    .catch((error) => {
      next(error);
      console.error("Error while retrieving activities ->", error);
    });
});

// POST one activity - FE: CompanyActivityDetailsPage
router.post("/", async (req, res) => {
  const payload = req.body;

  console.log(payload);
  try {
    const createdActivity = await Activity.create(payload);

    res.status(201).json(createdActivity);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error while creating the activity" });
  }
});

// PUT one activity - FE: CompanyActivityDetailsPage
router.put(
  "/:activityId", async (req, res) => {
    const payload = req.body;
    const { activityId } = req.params;
    try {
      const activityToUpdate = await Activity.findById(activityId);
      const updatedActivity = await Activity.findByIdAndUpdate(
        activityId,
        payload,
        { new: true }
      );
      res.status(200).json(updatedActivity);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "error while updating the activity" });
    }
  }
);

// DELETE one activity - FE: CompanyActivityDetailsPage
router.delete(
  "/:activityId", async (req, res) => {
    const { activityId } = req.params;
    try {
      const activityToDelete = await Activity.findById(activityId);
      console.log("Deleting");
      await Activity.findByIdAndDelete(activityId);
      res.status(204).json();
    } catch (error) {
      res.status(500).json({ message: "error while deleting the book" });
    }
  }
);

module.exports = router;
