const express = require('express')
// Single routing
const router = express.Router()
const {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
} = require('../controllers/jobs')

router.post('/', createJob).get(getAllJobs)
router.get('/:id', getJob).delete(deleteJob).patch(updateJob)

module.exports = router
