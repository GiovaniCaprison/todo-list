import React, { useContext } from 'react';
import { Switch, Menu, Dropdown, Button } from 'antd';
import { SettingOutlined } from "@ant-design/icons";
import { ThemeContext } from './ThemeContext';

function SettingsDropdown() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const menu = (
    <Menu>
      <Menu.Item>
        <span>Dark Mode</span>
        <Switch
          checked={theme === 'dark'}
          onChange={toggleTheme}
          style={{ marginLeft: '10px' }}
        />
      </Menu.Item>
      {/* Other menu items can go here */}
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <Button
        type="text"
        shape="circle"
        icon={<SettingOutlined />}
        className="settings-dropdown"
      />
    </Dropdown>
  );
}

export default SettingsDropdown;


