const router = require("express").Router();
const { isAuthenticated } = require("../middlewares/route-guard.middleware");
const User = require("../models/User.model");
const Company = require("../models/Company.model");


// GET one user - FE: CompanyProfilePage
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const oneUser = await User.findById(userId).populate("company");
    res.status(200).json(oneUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error while getting the user" });
  }
});


// PUT one user - FE: CompanyProfilePage
router.put(
  "/:userId",
  /*isAuthenticated,*/ async (req, res) => {
    // const { userId } = req.tokenPayload;
    const payload = req.body;
    const { currentUserId } = req.params;
    try {
      const userToUpdate = await User.findById(currentUserId);
      //   if (userToUpdate._Id == userId) {
      const updatedUser = await User.findByIdAndUpdate(currentUserId, payload, {
        new: true,
      });
      res.status(200).json(updatedUser);
      /* } else {
        res.status(403).json({ message: "you are not the right user" });
      }*/
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "error while updating the user" });
    }
  }
);


module.exports = router;
