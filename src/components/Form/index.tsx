import React, { useState } from 'react';

interface Todo {
  id: number;
  text: string;
  isCompleted?: boolean;
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>('');

  const handleClickDelete = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleCheck = (id: number) => {
    setTodos(
      todos.map(todo => {
        if (todo.id === id) {
          return {
            ...todo,
            isCompleted: !todo.isCompleted,
          };
        }
        return todo;
      })
    );
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTodos([...todos, { id: Date.now(), text: newTodo,isCompleted: false }]);
    setNewTodo('');
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newTodo}
          onChange={handleChange}
          placeholder="Add a new to-do"
          className="input input-bordered w-full max-w-xs"
        />
        <button type="submit" className='btn btn-primary' hidden>Add</button>
      </form>
      {todos.length === 0 ? (
        <p>There are no to-dos</p>
      ) : (
        <ul>
          {todos.map(todo => (
            <li key={todo.id}>
              <label>
                <input
                  type="checkbox"
                  checked={todo.isCompleted}
                  onChange={() => handleCheck(todo.id)}
                />
                {todo.isCompleted ? <s>{todo.text}</s> : todo.text}
              </label>
              <button onClick={() => handleClickDelete(todo.id)}>X</button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};


export default App
