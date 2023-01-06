import React, { useState } from 'react'

function Tasks() {
  const [tasks, setTasks] = useState([])
  const [currentTask, setCurrentTask] = useState({
    task: '',
    completed: false,
  })

  return (
    <div>Tasks</div>
  )
}

export default Tasks