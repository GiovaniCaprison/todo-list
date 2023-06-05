import { PlusCircleOutlined, DeleteTwoTone, SettingOutlined } from "@ant-design/icons";
import { Input, Button, List, Popconfirm, Card, Row, Col, Typography, Menu, Dropdown } from 'antd';
import React, { useState, useRef } from 'react';
import './App.css';
import SettingsDropdown from './SettingsDropdown';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

const { Title } = Typography;

function TodoApp() {
  const [todoList, setTodoList] = useState(null);

  const handleNewList = () => {
    const title = prompt('Enter new todo list title');
    setTodoList({ title, todos: [] });
  };

  const handleTitleChange = (newTitle) => {
    setTodoList((currentList) => ({ ...currentList, title: newTitle }));
  };

  const handleTodoChange = (index, value) => {
    setTodoList((currentList) => {
      const newTodos = [...currentList.todos];
      if (value === null) {
        newTodos.splice(index, 1);
      } else if (index === newTodos.length) {
        newTodos.push(value);
      } else {
        newTodos[index] = value;
      }
      return { ...currentList, todos: newTodos };
    });
  };

  const handleAction1 = () => {
    console.log('Action 1 triggered');
  };

  const handleAction2 = () => {
    console.log('Action 2 triggered');
  };

  return (
    <div className="todo-board">
      <Button
        shape="circle"
        icon={<PlusCircleOutlined />}
        onClick={handleNewList}
      />
      {todoList &&
        <TodoList
          title={todoList.title}
          onTitleChange={handleTitleChange}
          onDelete={() => setTodoList(null)}
          todos={todoList.todos}
          onTodoChange={handleTodoChange}
        />
      }
      <SettingsDropdown className="settings-dropdown" onAction1={handleAction1} onAction2={handleAction2} />
    </div>
  );
}

export default TodoApp;

