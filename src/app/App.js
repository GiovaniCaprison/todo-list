import React, { useState, useEffect } from 'react';
import { PlusCircleOutlined } from "@ant-design/icons";
import { Button } from 'antd';
import './App.css';
import SettingsDropdown from './SettingsDropdown';
import TodoList from './TodoList';
import { ThemeContext } from './ThemeContext';
import Model from './model';  // Assume you have this component
import { FloatButton} from "antd";

function TodoApp() {
  const [theme, setTheme] = useState('light');
  const [todoLists, setTodoLists] = useState([]);
  const [isNewListModalOpen, setIsNewListModalOpen] = useState(false);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const themeClass = theme === 'light' ? 'new-list-button-light' : 'new-list-button-dark';

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleNewList = (title) => {
    const newList = { title, todos: [] };
    setTodoLists([...todoLists, newList]);
    setIsNewListModalOpen(false);
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
        <div className={`app-container ${theme}`}>
          <div className="new-list-button">
            <Button
                className={themeClass}
                shape="circle"
                icon={<PlusCircleOutlined />}
                onClick={() => setIsNewListModalOpen(true)}
            />
          </div>
          <div className="todo-board">
            {todoLists.map((list, i) =>
                <TodoList
                    key={list.title}
                    title={list.title}
                    onTitleChange={(newTitle) => handleTitleChange(i, newTitle)}
                    onDelete={() => setTodoLists(todoLists.filter((_, index) => index !== i))}
                    todos={list.todos}
                    onTodoChange={(todoIndex, value) => handleTodoChange(i, todoIndex, value)}
                />
            )}
            <SettingsDropdown />
          </div>
          <FloatButton.BackTop />
          <Model
              isOpen={isNewListModalOpen}
              onClose={() => setIsNewListModalOpen(false)}
              onConfirm={handleNewList}
          />
        </div>
      </ThemeContext.Provider>
  );
}

export default TodoApp;