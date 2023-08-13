const Job = require('../models/Job')
require('dotenv').config()
const { BadRequestError } = require('../errors')
const { StatusCodes } = require('http-status-codes')

const getAllJobs = async (req, res) => {
  const jobs = await Job.find({})
  res.status(StatusCodes.OK).json({ jobs })
}
const getJob = async (req, res, next) => {
  const { id: jobID } = req.params

  const task = await Job.findsOne({ createdBy: userId })
  // if (!task) {
  //   return next(
  //     createCustomError(`Error: Task not found with id ${taskID}`, 404)
  //   )
  //   // const error = new Error('Not Found')
  //   // error.status = 404

  //   // return next(error)
  //   // return res.status(404).json({ msg: `Task not found with id ${taskID}` })
  // }
  res.status(200).json({ task })
}
const createJob = async (req, res) => {
  const userId = req.user.userId
  req.body.createdBy = userId
  console.log(req.body)
  const newJob = await Job.create(req.body)
  res.status(StatusCodes.CREATED).json({ newJob })
}

const updateJob = async (req, res) => {
  res.send('update a job')
}

const deleteJob = async (req, res) => {
  res.send('delete a job')
}

module.exports = { getAllJobs, getJob, createJob, updateJob, deleteJob }
