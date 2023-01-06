const express = require('express');
const router = express.Router();
const Task = require('../models/task');

// @route   GET api/tasks
// @desc    Get all tasks
// @access  Public
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find().populate('user', ['email']);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// @route   GET api/tasks/:id
// @desc    Get a task by user id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.params.id }).populate('user', [
      'email'
    ]);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// @route   POST api/tasks
// @desc    Add a task
// @access  Public
router.post('/', async (req, res) => {
  const { task, completed, user } = req.body;

  try {
    const newTask = new Task({
      task,
      completed,
      user
    });

    const taskAdded = await newTask.save();
    res.json(taskAdded);
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// @route   PUT api/tasks/:id
// @desc    Update a task
// @access  Public
router.put('/:id', async (req, res) => {
  const { task, completed } = req.body;

  // Build task object
  const taskFields = {};
  if (task) taskFields.task = task;
  if (completed) taskFields.completed = completed;

  try {
    let task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ msg: 'Task not found' });

    task = await Task.findByIdAndUpdate(
      req.params.id,
      { $set: taskFields },
      { new: true }
    );

    res.json(task);
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// @route   DELETE api/tasks/:id
// @desc    Delete a task
// @access  Public
router.delete('/:id', async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ msg: 'Task not found' });

    await Task.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Task removed' });
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;