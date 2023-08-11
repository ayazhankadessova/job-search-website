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

  const { name, email, password } = req.body
  console.log(name, email, password)

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  const tempUser = { name, email, password: hashedPassword }

  console.log(tempUser)

  const newUser = await User.create({ ...tempUser })
  // // console.log(User)
  res.status(StatusCodes.CREATED).json(newUser)

  // res.send('login user')
}

const login = async (req, res) => {
  res.send('login user')
}

module.exports = { register, login }
