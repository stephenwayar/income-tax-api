const bcrypt = require("bcryptjs")
const User = require('../models/User')
const jwt = require('jsonwebtoken')

const login_user = async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  const passwordIsCorrect = user ? await bcrypt.compare(password, user.password) : false

  if(!(user && passwordIsCorrect)){
    return res.status(401).json({
      success: false,
      message: "Email or password is incorrect"
    })
  }

  const userForToken = {
    email: user.email,
    id: user._id,
  }

  const token = jwt.sign(
    userForToken,
    process.env.SECRET,
    { expiresIn: '1d' }
  )

  res.status(200).send({
    token,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    id: user._id
  })
}

const register_user = async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    password,
  } = req.body

  const user = await User.findOne({ email })

  if(user){
    return res.status(400).json({
      success: false,
      message: "There is a user with this email already"
    })
  }

  const newUser = new User({
    firstName,
    lastName,
    email,
    password
  })

  bcrypt.genSalt(10, (_err, salt) => {
    bcrypt.hash(newUser.password, salt, async (err, hash) => {
      if (err) throw err

      newUser.password = hash

      try{
        await newUser.save()

        res.status(201).end()
      } catch(error) {
        next(error)
      }
    })
  })
}

module.exports = { login_user, register_user }