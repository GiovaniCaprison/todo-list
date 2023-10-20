import React, { useState, useContext } from 'react';
import { DeleteTwoTone } from "@ant-design/icons";
import { Popconfirm, Typography, Input, Card } from 'antd';
import TodoForm from './TodoForm';
import { ThemeContext } from './ThemeContext';
import styled from 'styled-components';

const StyledCard = styled(Card)`
  width: 300px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  margin-bottom: 20px;
  background-color: ${props => props.theme === 'dark' ? '#404040' : '#FAF9F6'};
  color: ${props => props.theme === 'dark' ? '#121212' : '#000'};
`;

function TodoList({ title, onTitleChange, onDelete, todos, onTodoChange }) {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const { theme } = useContext(ThemeContext);

  const handleTitleChange = (e) => {
    setNewTitle(e.target.value);
  };

  const handleTitleBlur = () => {
    if (newTitle !== title) {
      onTitleChange(newTitle);
    }
    setIsEditingTitle(false);
  };

  const handleTitleClick = () => {
    setIsEditingTitle(true);
  };

  return (
    <StyledCard theme={theme}
      bordered={false}
      title={
        isEditingTitle ?
          <Input
            autoFocus
            value={newTitle}
            onChange={handleTitleChange}
            onBlur={handleTitleBlur}
            onPressEnter={handleTitleBlur}
          />
          :
          <div onClick={handleTitleClick} style={{ fontSize: '1.5em', fontWeight: 'bold' }}>{title}</div>
      }
      extra={
        <>
          <Popconfirm title="Delete list?" onConfirm={onDelete}><DeleteTwoTone /></Popconfirm>
        </>
      }
    >
        {todos.map((todo, index) => (
            <TodoForm
                theme={theme}
                initialValue={todo}
                onChange={(value) => onTodoChange(index, value)}
                onDelete={() => onTodoChange(index, null)}
            />
        ))}
        <TodoForm
              theme={theme}
              isNewItem={true}
              onSubmit={(value) => {
                if (value) {
                  onTodoChange(todos.length, value);
                }
              }}
            />
    </StyledCard>
  );
}

export default TodoList;
