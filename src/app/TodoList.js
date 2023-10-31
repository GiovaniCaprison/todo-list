import React, { useState, useContext } from 'react';
import { DeleteTwoTone } from "@ant-design/icons";
import {Popconfirm, Input, Card, Button} from 'antd';
import TodoForm from './TodoForm';
import { ThemeContext } from './ThemeContext';
import styled from 'styled-components';
styled(Card)`
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
        <Card
            style={{ width: '100%', maxWidth: '400px' }}
            title={
                isEditingTitle ? (
                    <Input
                        autoFocus
                        value={newTitle}
                        onChange={handleTitleChange}
                        onBlur={handleTitleBlur}
                        onPressEnter={handleTitleBlur}
                    />
                ) : (
                    <div onClick={handleTitleClick} style={{ cursor: 'pointer' }}>
                        {title}
                    </div>
                )
            }
            extra={
                <Popconfirm title="Delete list?" onConfirm={onDelete}>
                    <Button className={'delete-button'} shape="circle" icon={<DeleteTwoTone />} />
                </Popconfirm>
            }
        >
            {todos.map((todo, index) => (
                <TodoForm
                    key={index}
                    initialValue={todo}
                    onChange={() => {}}
                    onDelete={() => onTodoChange(index, null)}
                    onSubmit={(value) => onTodoChange(index, value)}
                    theme={theme}
                />
            ))}
            <TodoForm
                isNewItem={true}
                onSubmit={(value) => onTodoChange(todos.length, value)}
                theme={theme}
            />
        </Card>
    );
}

export default TodoList;
