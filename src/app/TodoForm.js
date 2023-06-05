import React, { useState, useRef } from 'react';
import { PlusCircleOutlined, DeleteTwoTone, SettingOutlined } from "@ant-design/icons";
import { Input, Button, List, Popconfirm, Card, Row, Col, Typography, menu, Dropdown } from 'antd';

function TodoForm({ initialValue = "", onChange = () => {}, onSubmit, onDelete, isNewItem = false }) {
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
  if (e.key === 'Enter' && onSubmit) {
    onSubmit(value);
    if (isNewItem) {
      setValue('');
    }
    if (inputRef.current) {
      inputRef.current.blur();
    }
  }
};

  const handleClick = () => {
    setIsEditing(true);
  }

   return (
      <Row gutter={8} style={{ padding: '10px 0' }}>
        <Col span={16}>
          <Input
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