const Job = require('../models/Job')
require('dotenv').config()
const { BadRequestError, NotFoundError } = require('../errors')
const { StatusCodes } = require('http-status-codes')

const getAllJobs = async (req, res) => {
  const userId = req.user.userId
  const jobs = await Job.find({ createdBy: userId }).sort('createdAt')
  res.status(StatusCodes.OK).json({ jobs, count: jobs.length })
}

const createJob = async (req, res) => {
  const userId = req.user.userId
  req.body.createdBy = userId
  console.log(req.body)
  const newJob = await Job.create(req.body)
  res.status(StatusCodes.CREATED).json({ newJob })
}

const getJob = async (req, res, next) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req

  const job = await Job.findOne({ _id: jobId, createdBy: userId })

  if (!job) {
    throw new NotFoundError(`Job ${jobId} not found'`)
  }
  res.status(StatusCodes.OK).json({ job })
}

const updateJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req

  const {
    body: { company, position },
  } = req

  // console.log(company)

  const filter = { _id: jobId, createdBy: userId }

  // can be undefined but cannot be empty
  if (company === '' || position === '') {
    throw new BadRequestError('Company or Position fields cannot be empty.')
  }

  const job = await Job.findByIdAndUpdate(filter, req.body, {
    new: true,
    runValidators: true,
  })

  if (!job) {
    throw new NotFoundError(`Job ${jobId} not found'`)
  }

  res.status(StatusCodes.OK).json({ job })
}

const deleteJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req

  const filter = { _id: jobId, createdBy: userId }

  const job = await Job.findByIdAndRemove(filter)

  if (!job) {
    throw new NotFoundError(`Job ${jobId} not found'`)
  }

  res.status(StatusCodes.OK).send()
}

module.exports = { getAllJobs, getJob, createJob, updateJob, deleteJob }
