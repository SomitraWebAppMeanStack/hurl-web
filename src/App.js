import React, { useState } from 'react';
import {useSelector} from 'react-redux'
import 'antd/dist/antd.min.css';
import './App.css'
import './components/Layout/NavBar/NavBar.css';
import { Layout } from 'antd';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SideBarContent from './components/Layout/SideBar/SideBarContent';
import NavBarContent from './components/Layout/NavBar/NavBarContent';
import FooterContent from './components/Layout/Footer/FooterContent';
import LoginContent from './components/Login/LoginContent'
import UserContainer from './containers/UserContainer';
import DriverContainer from './containers/DriverContainer';
import BookingContainer from './containers/BookingContainer';
import ComissionContainer from './containers/ComissionContainer';
import FaresContainer from './containers/FaresContainer';
import NotificationContainer from './containers/NotificationContainer';
import PromocodeContainer from './containers/PromocodeContainer';
import PaymentContainer from './containers/PaymentContainer';
import SettingContainer from './containers/SettingContainer';
import MapContainer from './containers/MapContainer';
import UnAuthorized from './components/unauthorized/UnAuthorized';
import PromocodePage from './components/PromoCodeManagement/PromocodePage';
// import MyComponent from './components/Map/MyComponent ';
const { Content } = Layout;
function App() {
  const [state, setState] = useState({
    collapsed: false,
  })

  // const islogin = localStorage.getItem('is_login');
  const isLogin = useSelector((state)=>state.isLogin);
  // const token = useSelector((state)=>state.token);
  // console.log(isLogin,"from app.js file")
  // console.log(token,"token fron  app.js file")
  const toggle = () => {
    setState({
      collapsed: !state.collapsed,
    });
  };
  return (
    <div className="App">

      <Router>

        <Layout style={{ height: '100vh' }}>
          {
            isLogin === "true" ? (<>
              <SideBarContent state={state} />

            </>):''
          }
          <Layout>
            <Layout className="site-layout" >
              {
                isLogin === "true" ? (<>
                  <NavBarContent state={state} toggle={toggle} />
                </>):''
              }


              <Content
                className="site-layout-background"
                style={{
                  margin: '24px 16px',
                  padding: 24,
                  minHeight: 280,
                }}
              >
                <Routes>
                  <Route exact path="/hurl-web" element={<LoginContent />} />
                  {/* <Route exact path="/" element={<MyComponent />} /> */}
                  <Route exact path="/Admin/Map" element={<MapContainer />} />

                  {
                    isLogin === "true" ? (
                      <>
                        <Route exact path="/Admin/User" element={<UserContainer />} />
                        <Route exact path="/Admin/Driver" element={<DriverContainer />} />
                        <Route exact path="/Admin/Booking" element={<BookingContainer />} />
                        <Route exact path="/Admin/Comission" element={<ComissionContainer />} />
                        <Route exact path="/Admin/Fares" element={<FaresContainer />} />
                        <Route exact path="/Admin/Notification" element={<NotificationContainer />} />
                        <Route exact path="/Admin/Payment" element={<PaymentContainer />} />
                        <Route exact path="/Admin/PromoCode" element={<PromocodeContainer />} />
                        <Route exact path="/Admin/Setting" element={<SettingContainer />} />
                        <Route exact path="/Admin/AddPromoCode" element={<PromocodePage />} />
                      </>
                    ) :<Route exact path="/Admin/*" element={<UnAuthorized />} />
                  }



                </Routes>
              </Content>

            </Layout>
            <FooterContent />
          </Layout>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
