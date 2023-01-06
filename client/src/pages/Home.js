import React from 'react';
import '../App.css';
import { getTasks } from '../services/taskService';


function HomePage() {
  getTasks().then((res) => console.log(res.data));

  return (
    <div className='App'>
      <h1>Home Page</h1>
    </div>
  )
}

export default HomePage