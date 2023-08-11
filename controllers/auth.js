const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors')

const bcrypt = require('bcryptjs')

const register = async (req, res) => {
  // check if any of name, email, password is missing

  // //   const { name, email, password } = req.body
  // //   console.log(name, email, password)
  // //   if (!name || !email || !password) {
  // //     throw new BadRequestError('Either Name, Email, or Password is missing.')
  // //   }
  // // .. -> pass as single arguments -> good for validation

  // middleware takes care of hashing the password
  const newUser = await User.create({ ...req.body })
  res.status(StatusCodes.CREATED).json(newUser)
}

const login = async (req, res) => {
  res.send('login user')
}

module.exports = { register, login }
