const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError } = require('../errors')

const register = async (req, res) => {
  // check if any of name, email, password is missing

  const { name, email, password } = req.body
  console.log(name, email, password)
  if (!name || !email || !password) {
    throw new BadRequestError('Either Name, Email, or Password is missing.')
  }
  // .. -> pass as single arguments -> good for validation
  const User = await User.create(...req.body)
  res.status(StatusCodes.CREATED).json({ User })
}

const login = async (req, res) => {
  res.send('login user')
}

module.exports = { register, login }
