import { Button, Checkbox, Paper, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import {
  addTask,
  deleteTask,
  getTaskByUser,
  setAuthToken,
  updateTask
} from '../../services/taskService'
import './Tasks.css'

function Tasks() {
  const [tasks, setTasks] = useState([])
  const { user } = useAuth()
  const [currentTask, setCurrentTask] = useState({
    task: '',
    completed: false,
    user: user.user.id
  })

  useEffect(() => {
    setAuthToken(user.token)
    getData()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])


  async function getData() {
    try {
      const response = await getTaskByUser(user.user.id)
      setTasks(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  function handleChange(e) {
    setCurrentTask({
      ...currentTask,
      [e.target.name]: e.target.value
    })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const originalTasks = [...tasks]
    try {
      const response = await addTask(currentTask)
      setTasks([...originalTasks, response.data])
      setCurrentTask({
        task: '',
        completed: false
      })
    } catch (error) {
      console.log(error)
    }
  }

  async function handleUpdate (id) {
    const originalTasks = [...tasks]
    try {
      const tasks = [...originalTasks]
      const index = tasks.findIndex((task) => task._id === id)
      tasks[index] = { ...tasks[index] }
      tasks[index].completed = !tasks[index].completed
      console.log("⚡ ~ tasks[index]", tasks[index])
      setTasks(tasks)
      await updateTask(id, tasks[index])

    } catch (error) {
      setTasks(originalTasks)
      console.log(error)
    }
  }

  async function handleDelete(id) {
    const originalTasks = [...tasks]
    try {
      await deleteTask(id)
      const updatedTasks = originalTasks.filter((task) => task._id !== id)
      setTasks(updatedTasks)
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className="tasks_app flex">
      <Paper elevation={3} className="container">
        <div className="heading">TO-DO</div>
        <form
          onSubmit={handleSubmit}
          className="flex"
          style={{ margin: '15px 0' }}
        >
          <TextField
            variant="outlined"
            size="small"
            name='task'
            style={{ width: '80%' }}
            value={currentTask.task}
            required={true}
            onChange={handleChange}
            placeholder="Add a task"
          />
          <Button
            sx={{ height: '40px', padding: '0 10px' }}
            color="primary"
            variant="outlined"
            type="submit"
          >
            Add task
          </Button>
        </form>
        <div>
          {tasks.map((task) => (
            <Paper key={task._id} className="task task_container">
              <Checkbox
                checked={task.completed}
                onClick={() => handleUpdate(task._id)}
                color="primary"
              />
              <div className={task.completed ? 'task line_though' : 'task'}>
                {task.task}
              </div>
              <Button onClick={() => handleDelete(task._id)} color="secondary">
                delete
              </Button>
            </Paper>
          ))}
        </div>
      </Paper>
    </div>
  )
}

export default Tasks
