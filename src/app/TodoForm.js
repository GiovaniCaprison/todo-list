import React, { useState, useRef } from 'react';
import { DeleteTwoTone } from "@ant-design/icons";
import { Button, Popconfirm, Row, Col, Input } from 'antd';
import styled from 'styled-components';

const StyledInput = styled(Input)`
  color: ${props => props.theme === 'dark' ? '#fff' : '#000'};
  background-color: ${props => props.theme === 'dark' ? '#404040' : '#f0f2f5'};
`;

function TodoForm({ initialValue = "", onChange = () => {}, onSubmit, onDelete, isNewItem = false, theme }) {
  const [value, setValue] = useState(initialValue);
  const [isEditing, setIsEditing] = useState(isNewItem);
  const inputRef = useRef(null);

  const handleChange = (e) => {
    setValue(e.target.value);
    if(onChange) onChange(e.target.value);
  };

  const handleBlur = () => {
    if (onSubmit) {
      onSubmit(value);
      if (!isNewItem) setIsEditing(false);
    }
  };

const handleKeyPress = (e) => {
  if (e.key === 'Enter') {
    e.stopPropagation();
    if (onSubmit) {
      onSubmit(value);
      if (isNewItem) {
        setValue('');
      }
      if (inputRef.current) {
        inputRef.current.blur();
      }
    }
  }
};

  const handleClick = () => {
    setIsEditing(true);
  }

   return (
      <Row gutter={8} style={{ padding: '10px 0' }}>
        <Col span={16}>
          <StyledInput theme={theme}
            ref={inputRef}
            placeholder="New task..."
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyPress={handleKeyPress}
            onClick={handleClick}
            autoFocus={isEditing}
          />
        </Col>
        {onDelete && (
          <Col span={4}>
            <Popconfirm
              title="Delete task?"
              onConfirm={onDelete}
            >
              <Button shape="circle" icon={<DeleteTwoTone />} />
            </Popconfirm>
          </Col>
        )}
      </Row>
    );
}

export default TodoForm;
