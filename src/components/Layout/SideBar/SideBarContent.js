import React from 'react';
import { Menu ,Layout} from 'antd';
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
const {Sider} = Layout;

function SideBarContent(props) {

  return (
    <>
    <Sider trigger={null} collapsible collapsed={props.state.collapsed}>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
            items={[
              {
                key: '1',
                icon: <UserOutlined />,
                label: <Link to="/Admin/Map">Dashboard</Link>,
              },
              {
                key: '2',
                icon: <VideoCameraOutlined />,
                label: <Link to="/Admin/User"> User Management</Link>,
              },
              {
                key: '3',
                icon: <UploadOutlined />,
                label: <Link to="/Admin/Driver">Driver Management</Link>,
              },
              {
                key: '4',
                icon: <UploadOutlined />,
                label: <Link to="/Admin/Payment">Payment Management</Link>,
              },
              {
                key: '5',
                icon: <UploadOutlined />,
                label: <Link to="/Admin/Comission">Comission Management</Link>,
              },
              {
                key: '6',
                icon: <UploadOutlined />,
                label: <Link to="/Admin/PromoCode">Promo Code Management</Link>,
              },
              {
                key: '7',
                icon: <UploadOutlined />,
                label: <Link to="/Admin/Fares">Fares Management</Link>,
              },
              {
                key: '8',
                icon: <UploadOutlined />,
                label: <Link to="/Admin/Booking">Booking Request Management</Link>,
              },
              {
                key: '9',
                icon: <UploadOutlined />,
                label: <Link to="/Admin/Notification">Notifications Management</Link>,
              },
              {
                key: '10',
                icon: <UploadOutlined />,
                label: <Link to="/Admin/Setting">Setting</Link>,
              },
            ]}
          />
        </Sider>
    </>
  )
}

export default SideBarContent;













