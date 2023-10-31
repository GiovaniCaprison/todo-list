import React, { useContext } from 'react';
import { Switch, Menu, Dropdown, Button } from 'antd';
import { SettingOutlined } from "@ant-design/icons";
import { ThemeContext } from './ThemeContext';

function SettingsDropdown() {
    const { theme, toggleTheme } = useContext(ThemeContext);

    const menu = (
        <Menu items={[
            {
                key: 'darkMode',
                label: (
                    <span>
            Dark Mode
            <Switch
                checked={theme === 'dark'}
                onChange={toggleTheme}
                style={{ marginLeft: '10px' }}
            />
          </span>
                ),
            },
            // Add other menu items here
        ]} />
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


