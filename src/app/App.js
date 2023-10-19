import { PlusCircleOutlined } from "@ant-design/icons";
import { Button } from 'antd';
import React, { useState, useEffect } from 'react';
import { ThemeContext } from './ThemeContext';
import './App.css';
import SettingsDropdown from './SettingsDropdown';
import TodoList from './TodoList';

function TodoApp() {
  const [theme, setTheme] = useState('light');
  const [todoLists, setTodoLists] = useState([]);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleNewList = () => {
    const title = prompt('Enter new todo list title');
    const newList = { title, todos: [] };
    setTodoLists([...todoLists, newList]);
  };

  const handleTitleChange = (index, newTitle) => {
    setTodoLists(todoLists.map((list, i) => i === index ? { ...list, title: newTitle } : list));
  };

  const handleTodoChange = (listIndex, todoIndex, value) => {
    setTodoLists(todoLists.map((list, i) => {
      if (i !== listIndex) return list;

      const newTodos = [...list.todos];
      if (value === null) {
        newTodos.splice(todoIndex, 1);
      } else if (todoIndex === newTodos.length) {
        newTodos.push(value);
      } else {
        newTodos[todoIndex] = value;
      }
      return { ...list, todos: newTodos };
    }));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="todo-board">
        <Button
          shape="circle"
          icon={<PlusCircleOutlined />}
          onClick={handleNewList}
        />
        {todoLists.map((list, i) =>
          <TodoList
            key={i}
            title={list.title}
            onTitleChange={(newTitle) => handleTitleChange(i, newTitle)}
            onDelete={() => {
              const newList = [...todoLists];
              newList.splice(i, 1);
              setTodoLists(newList);
            }}
            todos={list.todos}
            onTodoChange={(todoIndex, value) => handleTodoChange(i, todoIndex, value)}
          />
        )}
        <SettingsDropdown />
      </div>
    </ThemeContext.Provider>
  );
}

export default TodoApp;

