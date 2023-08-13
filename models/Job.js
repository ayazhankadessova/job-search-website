const mongoose = require('mongoose')

const JobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, 'Please, provide a company name.'],
      trim: true,
      maxlength: [50, 'Company name cannot be more than 50 characters'],
    },
    position: {
      type: String,
      required: [true, 'Please, provide a position name.'],
      maxlength: [100, 'Position name cannot be more than 100 characters'],
    },
    status: {
      type: String,
      enum: ['accepted', 'pending', 'rejected', 'hackerrank'],
      default: 'pending',
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please, provide a user.'],
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Job', JobSchema)
