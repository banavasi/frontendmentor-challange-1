import React, { useState } from 'react';
import { Task,TypeTask } from './components/TaskList';
import { useBearStore } from './store';
const App = () => {
  const { increase,bears } = useBearStore();
  const [tasks, setTasks] = useState<TypeTask[]>([
    {
      id: 0,
      text: "Drag and drop to reorder listDrag and drop to reorder listDrag and drop to reorder listDrag and drop to reorder listDrag and drop to reorder listDrag and drop to reorder listDrag and drop to reorder list",
      completed: false,
    },
    {
      id: 1,
      text: "Task 2",
      completed: false,
    },
    {
      id: 2,
      text: "Task 4",
      completed: false,
    },
  ]); 
  return (
    <div>
      <h1>My App</h1>
      <Task tasks={tasks} />
      Total{bears}
      <button className='btn-primary btn' onClick={()=> increase(3) }> Add </button>
    </div>
  );
};

export default App;