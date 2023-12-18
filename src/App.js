
import React, { useState } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editingTodoText, setEditingTodoText] = useState('');

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
      setNewTodo('');
    }
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const updateTodo = (id) => {
    setEditingTodoId(id);
    const todoToUpdate = todos.find((todo) => todo.id === id);
    setEditingTodoText(todoToUpdate.text);
  };

  const saveUpdatedTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: editingTodoText } : todo
      )
    );
    setEditingTodoId(null);
    setEditingTodoText('');
  };

  const cancelUpdate = () => {
    setEditingTodoId(null);
    setEditingTodoText('');
  };

  return (
    <div className="App p-5 ">
      <h1 className='font-serif font-extrabold text-3xl  text-pink-500'>Todo App</h1>
      <br />
      <div>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          className='py-3 px-6 rounded-lg text-lg text-green-900 '
        />
        <button onClick={addTodo}
          className='py-3 px-4 font-bold  rounded-lg text-lg text-black bg-purple-400'

        >Add Todo</button>
      </div>
      <br /><br />
      <ul className='w-full'>
        {todos.map((todo) => (
          <li key={todo.id}>
            {editingTodoId === todo.id ? (
              <>
                <input
                  type="text"
                  value={editingTodoText}
                  onChange={(e) => setEditingTodoText(e.target.value)}
                className='font-medium text-xl bg-green-400 p-3 rounded-xl'

                />
                <button onClick={() => saveUpdatedTodo(todo.id)}
                className='font-medium text-xl bg-blue-400 p-3 rounded-xl'
                >Save</button>
                <button onClick={cancelUpdate}
                className='font-medium text-xl bg-pink-400 p-3 rounded-xl'
                >Cancel</button>
              </>
            ) : (
              <>
                <span
                className='w-96 font-medium text-xl  bg-orange-400 p-3 rounded-xl'
                  style={{
                    textDecoration: todo.completed ? 'line-through' : 'none',
                  }}
                >
                  {todo.text}
                </span>

                <button
                className='font-medium text-xl mx-2 bg-red-700 p-3  rounded-xl'
                onClick={() => deleteTodo(todo.id)}>Delete</button>
                <button 
                className='font-medium text-xl bg-green-400 p-3 rounded-xl'
                onClick={() => updateTodo(todo.id)}>Update</button>
                
              </>
            )}
            <br />
                <br />
          </li>
          
        ))}
      </ul>
    </div>
  );
}

export default App;
