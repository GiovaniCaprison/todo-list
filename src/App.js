import './App.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
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
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(todo);

  const handlePencilClick = () => {
    setIsEditing(true);
  };

  return (
    <div className={className}>
      <div className="todo-item-content">
        {isEditing ? (
          <TodoForm
            onSubmit={(value) => { onEditClick(value); setIsEditing(false); setEditValue(value); }}
            buttonText="Save"
            initialValue={editValue}
            onChange={setEditValue}
          />
        ) : (
          <>
            <span className="todo-text">{todo}</span>
            <button className="pencil-button" onClick={handlePencilClick}>
              <FontAwesomeIcon icon={faPencilAlt} />
            </button>
          </>
        )}
        {isEditing && (
          <button className="delete-button" onClick={onDeleteClick}>
            <FontAwesomeIcon icon={faTrashAlt} />
          </button>
        )}
      </div>
    </div>
  );
}

function TodoApp() {
  const [todos, setTodos] = useState([]);

  const handleNewSubmit = (value) => {
    setTodos([...todos, value]);
  };

  const handleEditClick = (index, value) => {
    setTodos(todos.map((todo, i) => (i === index ? value : todo)));
  };

  const handleDeleteClick = (index) => {
    setTodos(todos.filter((_, todoIndex) => todoIndex !== index));
  };

  let todoItemClass = "todo-item todo-item-large";
  if (todos.length >= 5) {
    todoItemClass = "todo-item todo-item-small";
  } else if (todos.length >= 3) {
    todoItemClass = "todo-item todo-item-medium";
  }

  return (
    <div className="todo-box">
      <TodoForm onSubmit={handleNewSubmit} buttonText="Add" />
      <div className={`todo-list ${todoItemClass}`}>
        {todos.map((todo, index) => (
          <TodoItem
            key={index}
            todo={todo}
            className={todoItemClass}
            onEditClick={(value) => handleEditClick(index, value)}
            onDeleteClick={() => handleDeleteClick(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default TodoApp;




