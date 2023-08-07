const express = require("express");
const router = express.Router();
const {
  getAllJobs,
  getAJob,
  createAJob,
  editAJob,
  deleteAJob,
} = require("../controllers/jobs");

router.route("/").get(getAllJobs).post(createAJob);
router.route("/:id").get(getAJob).patch(editAJob).delete(deleteAJob);

module.exports = router;
