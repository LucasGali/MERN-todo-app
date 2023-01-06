const express = require('express')
const router = express.Router()
const User = require('../models/user')

// @route   GET api/users
// @desc    Get all users
// @access  Public
router.get('/', async (req, res) => {
  try {
    const users = await User.find()
    res.json(users)
  } catch (error) {
    res.status(500).json({ msg: 'Server error' })
  }
})

// @route   POST api/users
// @desc    Add a user
// @access  Public
router.post('/', async (req, res) => {
  const { email, password } = req.body

  try {
    const newUser = new User({
      email,
      password
    })

    const userAdded = await newUser.save()
    res.json(userAdded)
  } catch (error) {
    res.status(500).json({ msg: 'Server error' })
  }
})

// @route   PUT api/users/:id
// @desc    Update a user
// @access  Public
router.put('/:id', async (req, res) => {
  const { email, password } = req.body

  // Build user object
  const userFields = {}
  if (email) userFields.email = email
  if (password) userFields.password = password

  try {
    let user = await User.findById(req.params.id)

    if (!user) return res.status(404).json({ msg: 'User not found' })

    user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: userFields },
      { new: true }
    )

    res.json(user)
  } catch (error) {
    res.status(500).json({ msg: 'Server error' })
  }
})

// @route   DELETE api/users/:id
// @desc    Delete a user
// @access  Public
router.delete('/:id', async (req, res) => {
  try {
    let user = await User.findById(req.params.id)

    if (!user) return res.status(404).json({ msg: 'User not found' })

    await User.findByIdAndRemove(req.params.id)

    res.json({ msg: 'User removed' })
  } catch (error) {
    res.status(500).json({ msg: 'Server error' })
  }
})

module.exports = router
