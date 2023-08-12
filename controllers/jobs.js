const getAllJobs = async (req, res) => {
  res.send('get all jobs')
}
const getJob = async (req, res) => {
  res.send('get a job')
}
const createJob = async (req, res) => {
  res.send(req.user)
}

const updateJob = async (req, res) => {
  res.send('update a job')
}

const deleteJob = async (req, res) => {
  res.send('delete a job')
}

module.exports = { getAllJobs, getJob, createJob, updateJob, deleteJob }
