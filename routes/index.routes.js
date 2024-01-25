const router = require('express').Router()

router.get('/', (req, res) => {
  res.json('All good in here')
})

const activitiesRouter = require("./activity.routes");
router.use("/activities", activitiesRouter);

module.exports = router
