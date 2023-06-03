import './App.css';


import React, { useState } from 'react';

function TodoForm({ onSubmit, buttonText, initialValue = "", onChange = () => {} }) {
  const [value, setValue] = useState(initialValue);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(value);
    setValue("");
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input className="todo-input" value={value} onChange={(e) => { setValue(e.target.value); onChange(e.target.value); }} />
      <button className="submit-button" type="submit">{buttonText}</button>
    </form>
  );
}

function TodoItem({ todo, className, onEditClick, onDeleteClick }) {
  return (
    <div className={className}>
      <div className="todo-item-content">
        <span className="todo-text">{todo}</span>
        <div>
          <button className="edit-button" onClick={onEditClick}>Edit</button>
          <button className="delete-button" onClick={onDeleteClick}>Delete</button>
        </div>
      </div>
    </div>
  );
}

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState("");

  const handleNewSubmit = (value) => {
    setTodos([...todos, value]);
  };

  const handleEditSubmit = (value) => {
    const newTodos = [...todos];
    newTodos[editIndex] = value;
    setTodos(newTodos);
    setEditIndex(null);
  };

  const handleDeleteClick = (index) => {
    const newTodos = todos.filter((_, todoIndex) => todoIndex !== index);
    setTodos(newTodos);
    if (editIndex === index) { setEditIndex(null); }
  };

  let todoItemClass = "todo-item todo-item-large";
  if (todos.length >= 5) {
    todoItemClass = "todo-item todo-item-small";
  } else if (todos.length >= 3) {
    todoItemClass = "todo-item todo-item-medium";
  } else {
    todoItemClass = "todo-item todo-item-large";
  }

  return (
    <div className="todo-box">
      {editIndex === null ? (
        <TodoForm onSubmit={handleNewSubmit} buttonText="Add" />
      ) : (
        <TodoForm
          onSubmit={handleEditSubmit}
          buttonText="Save"
          initialValue={editText}
          onChange={setEditText}
        />
      )}

      <div className={`todo-list ${todoItemClass}`}>
        {todos.map((todo, index) =>
          index === editIndex ? (
            <div key={index}>{editText}</div>
          ) : (
           <TodoItem
             key={index}
             todo={todo}
             className={todoItemClass}
             onEditClick={() => { setEditIndex(index); setEditText(todo); }}
             onDeleteClick={() => handleDeleteClick(index)}
           />
          )
        )}
      </div>
    </div>
  );
}

export default TodoApp;


