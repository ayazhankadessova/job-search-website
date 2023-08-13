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

router.post('/', createJob)
router.get('/', getAllJobs)

router.get('/:id', getJob)
router.patch('/:id', updateJob)
router.delete('/:id', deleteJob)

module.exports = router
