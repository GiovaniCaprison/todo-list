import { Menu, Dropdown, Button } from 'antd';
import { SettingOutlined, SettingTwoTone, ThunderboltTwoTone } from "@ant-design/icons";

function SettingsDropdown({ onAction1, onAction2 }) {
  const menu = (
    <Menu>
      <Menu.Item key="1" icon={<SettingTwoTone />} onClick={onAction1}>
      </Menu.Item>
      <Menu.Item key="2" icon={<ThunderboltTwoTone />} onClick={onAction2}>
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <Button
        type="text"
        shape="circle"
        icon={<SettingOutlined />}
        style={{ float: 'right' }}
      />
    </Dropdown>
  );
}

export default SettingsDropdown;
