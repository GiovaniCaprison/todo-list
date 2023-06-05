import React, { useState } from 'react';
import { DeleteTwoTone } from "@ant-design/icons";
import { Input, List, Popconfirm, Card, Typography } from 'antd';
import TodoForm from './TodoForm';

const { Title } = Typography;

function TodoList({ title, onTitleChange, onDelete, todos, onTodoChange }) {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  const handleTitleBlur = () => {
    if (newTitle !== title) {
      onTitleChange(newTitle);
    }
    setIsEditingTitle(false);
  };

  const handleTitleChange = (e) => {
    setNewTitle(e.target.value);
  };

  const handleAction1 = () => {
    console.log('Action 1 triggered');
  };

  const handleAction2 = () => {
    console.log('Action 2 triggered');
  };

  return (
    <Card
      bordered={false}
      style={{ width: 300, boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)', borderRadius: '8px', marginBottom: '20px' }}
      title={
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
          <Title level={3} editable={{ onChange: onTitleChange }}>{title}</Title>
      }
      extra={
        <>
          <Popconfirm title="Delete list?" onConfirm={onDelete}><DeleteTwoTone /></Popconfirm>
        </>
      }
    >
      {todos.map((todo, index) => (
        <List.Item key={index} style={{ padding: '10px 0' }}>
          <TodoForm
            initialValue={todo}
            onChange={(value) => onTodoChange(index, value)}
            onDelete={() => onTodoChange(index, null)}
          />
        </List.Item>
      ))}
      <List.Item style={{ padding: '10px 0' }}>
        <TodoForm
          isNewItem={true}
          onSubmit={(value) => {
            if (value) {
              onTodoChange(todos.length, value);
            }
          }}
        />
      </List.Item>
    </Card>
  );
}

export default TodoList;