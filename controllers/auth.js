const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const bcrypt = require('bcryptjs')

const register = async (req, res) => {
  // // .. -> pass as single arguments -> good for validation

  // middleware takes care of hashing the password
  const newUser = await User.create({ ...req.body })

  const id = newUser._id
  const newName = newUser.name

  // const token = jwt.sign({ userId: newUser._id, name: user.name }, process.env.JWT_SECRET, {
  //   expiresIn: '30d',
  // })

  const token = jwt.sign({ id, newName }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
  res.status(StatusCodes.CREATED).json({ user: { name: newUser.name }, token })
}

const login = async (req, res) => {
  res.send('login user')
}

module.exports = { register, login }
