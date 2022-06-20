import React from 'react';
import { Layout} from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';

const { Header} = Layout;

function NavBarContent(props) {
  return (
    <>
    <Header className="site-layout-background" style={{ padding: 0 }}>
              {React.createElement(props.state ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: 'trigger',
                onClick: props.toggle,
              })}
            </Header>
    </>
  )
}

export default NavBarContent







