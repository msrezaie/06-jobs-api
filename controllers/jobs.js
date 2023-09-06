const Job = require("../models/Job");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors/index");

const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userID });
  res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
};

const getAJob = async (req, res) => {
  const {
    params: { jobID },
    user: { userID },
  } = req;
  const job = await Job.findById({
    _id: jobID,
    createdBy: userID,
  });
  if (!job) {
    throw new NotFoundError("no job found for given ID!");
  }
  res.status(StatusCodes.OK).json({ job });
};

const createAJob = async (req, res) => {
  req.body.createdBy = req.user.userID;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ note: "following job created:", job });
};

const editAJob = async (req, res) => {
  const {
    body: { company, position },
    params: { jobID },
    user: { userID },
  } = req;
  if (!company || !position) {
    throw new BadRequestError(
      "please provide value for 'company' & 'position'!"
    );
  }

  const job = await Job.findByIdAndUpdate(
    {
      _id: jobID,
      createdBy: userID,
    },
    req.body,
    { new: true, runValidators: true }
  );

  if (!job) {
    throw new NotFoundError("no job found for given ID!");
  }
  res.status(StatusCodes.OK).json({ job });
};

const deleteAJob = async (req, res) => {
  const {
    params: { jobID },
    user: { userID },
  } = req;

  const deletedJob = await Job.findByIdAndRemove(
    {
      _id: jobID,
      createdBy: userID,
    },
    { new: true }
  );
  if (!deletedJob) {
    throw new NotFoundError("no job found for given ID!");
  }
  res.status(StatusCodes.OK).json({ note: "deleted:", deletedJob });
};

module.exports = { getAllJobs, getAJob, createAJob, editAJob, deleteAJob };
