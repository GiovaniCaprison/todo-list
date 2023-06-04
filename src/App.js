import { PlusCircleOutlined, CheckCircleOutlined, DeleteTwoTone, } from "@ant-design/icons";
import { Input, Button, List, Popconfirm, Form, Card, } from 'antd';
import React, { useState } from 'react';
import './App.css';

function TodoForm({ onSubmit, icon, initialValue = "", onChange = () => {}, onDelete }) {
  const [value, setValue] = useState(initialValue);

   const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(value || null);
    setValue("");
  };

  return (
    <Form className="todo-form" onFinish={handleSubmit}>
      <Input
        placeholder="New task..."
        value={value}
        onChange={(e) => { setValue(e.target.value); onChange(e.target.value); }}
      />
      <Button htmlType="submit" shape="circle" icon={icon} />
      {onDelete && (
        <Popconfirm
          title="Sure to delete?"
          onConfirm={onDelete}
        >
          <Button shape="circle" icon={<DeleteTwoTone />} />
        </Popconfirm>
      )}
    </Form>
  );
}

function TodoList({ title, onTitleChange, onDelete, todos, onTodoChange }) {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  const handleTitleBlur = () => {
    if (newTitle !== title) {
      onTitleChange(newTitle);
    }
    setIsEditingTitle(false);
  };

  const handleTitleClick = () => {
    setIsEditingTitle(true);
  };

  const handleTitleChange = (e) => {
    setNewTitle(e.target.value);
  };

  return (
    <Card title={
      isEditingTitle ?
        <Input
          autoFocus
          defaultValue={title}
          value={newTitle}
          onChange={handleTitleChange}
          onBlur={handleTitleBlur}
          onPressEnter={handleTitleBlur}
        />
        :
        <span onClick={handleTitleClick}>{title}</span>
    }
      extra={<Popconfirm title="Sure to delete?" onConfirm={onDelete}><DeleteTwoTone /></Popconfirm>}
    >
      {todos.map((todo, index) => (
        <List.Item key={index}>
          <TodoForm
            onSubmit={(value) => onTodoChange(index, value)}
            icon={<CheckCircleOutlined />}
            initialValue={todo}
            onDelete={() => onTodoChange(index, null)}
          />
        </List.Item>
      ))}
      <TodoForm onSubmit={(value) => onTodoChange(todos.length, value)} icon={<PlusCircleOutlined />} />
    </Card>
  );
}


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

  return (
    <div className="todo-board">
      <Button shape="circle" icon={<PlusCircleOutlined />} onClick={handleNewList} />
      {todoList &&
        <TodoList
          title={todoList.title}
          onTitleChange={handleTitleChange}
          onDelete={() => setTodoList(null)}
          todos={todoList.todos}
          onTodoChange={handleTodoChange}
        />
      }
    </div>
  );
}

export default TodoApp;

