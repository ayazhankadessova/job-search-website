const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors')
require('dotenv').config()

const bcrypt = require('bcryptjs')

const register = async (req, res) => {
  // // .. -> pass as single arguments -> good for validation

  // middleware takes care of hashing the password
  const newUser = await User.create({ ...req.body })

  // const id = newUser._id
  // const newName = newUser.name

  // const token = jwt.sign({ id, newName }, process.env.JWT_SECRET, {
  //   expiresIn: '30d',
  // })

  const token = newUser.createToken()
  console.log(token)

  res.status(StatusCodes.CREATED).json({ user: { name: newUser.name }, token })
}

/*

1. Check for email & password -> if not there, Bad Request
2. Find user based on email
3. Compare password
4. If password is correct -> generate token
5. If password is incorrect -> error
*/
const login = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    throw new BadRequestError('Please enter a valid email address & a password')
  }

  const loginUser = await User.findOne({ email })

  if (!loginUser) {
    throw new UnauthenticatedError('No user found.')
  }

  // compare password
  const isPasswordMatch = await loginUser.comparePassword(password)

  if (!isPasswordMatch) {
    throw new UnauthenticatedError('Incorrect Password.')
  }

  // create a token
  const token = loginUser.createToken()

  res
    .status(StatusCodes.CREATED)
    .json({ user: { name: loginUser.name }, token })
}

module.exports = { register, login }
