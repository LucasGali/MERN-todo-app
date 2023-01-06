import './App.css';
import { getTasks } from './services/taskService';

function App() {
  getTasks().then((res) => console.log(res.data));
  
  return (
    <div className="App">
      <h1>React app</h1>
    </div>
  );
}

export default App;
