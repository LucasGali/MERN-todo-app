const express = require('express')
const Joi = require('@hapi/joi')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const router = express.Router()
const User = require('../models/user')

// validation

const schemaRegister = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  email: Joi.string().min(6).max(255).required().email(),
  password: Joi.string().min(6).required()
})

const schemaLogin = Joi.object({
  email: Joi.string().min(6).max(255).required().email(),
  password: Joi.string().min(6).required()
})

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body

  const { error } = schemaRegister.validate(req.body)

  if (error) {
    return res.status(400).json({ msg: error.details[0].message })
  }

  // check if user already exists

  const emailExists = await User.findOne({ email })

  if (emailExists) {
    return res.status(400).json({ msg: 'Email already exists' })
  }

  // hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  const user = new User({
    name,
    email,
    password: hashedPassword
  })

  try {
    const savedUser = await user.save()
    res.status(200).json(savedUser)
  } catch (error) {
    res.status(400).json({ msg: error })
  }
})

router.post('/login', async (req, res) => {
  const { email, password } = req.body

  const { error } = schemaLogin.validate(req.body)
  if (error) {
    return res.status(400).json({ msg: error.details[0].message })
  }

  // check if user exists
  const user = await User.findOne({ email })
  if (!user) {
    return res.status(400).json({ msg: 'User not found' })
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(400).json({ msg: 'Email or password is wrong' })
  }

  const token = jwt.sign({
    name: user.name,
    id: user._id
  }, process.env.TOKEN_SECRET)

  res.header('auth-token', token).status(200).json({ 
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email
    },
    msg: 'Logged in'
  })

  // res.status(200).json({ msg: 'Logged in' })
})

module.exports = router
