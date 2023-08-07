const Job = require("../models/Job");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors/index");

const getAllJobs = async (req, res) => {
  res.send("getAllJobs");
};

const getAJob = async (req, res) => {
  res.send("getAJob");
};

const createAJob = async (req, res) => {
  req.body.createdBy = req.user.userID;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json(job);
};

const editAJob = async (req, res) => {
  res.send("editAJob");
};

const deleteAJob = async (req, res) => {
  res.send("deleteAJob");
};

module.exports = { getAllJobs, getAJob, createAJob, editAJob, deleteAJob };
