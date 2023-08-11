const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'must provide name'],
    trim: true,
    maxlength: [20, 'name cannot be more than 20 characters'],
  },
  email: {
    type: String,
    required: [true, 'must provide email'],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please provide a valid email',
    ],
    // creates unique index , but not a validator
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'must provide password'],
    trim: true,
    minlength: [6, 'name cannot be less than 20 characters'],
  },
})

// what do we want to accomplish before we save
UserSchema.pre('save', async function () {
  // generate random bytes
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})
module.exports = mongoose.model('User', UserSchema)
