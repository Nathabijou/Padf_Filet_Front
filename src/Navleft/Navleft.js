import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/js/dist/dropdown';
import './Navleft.css';
import { Menu, Button, Input, Avatar } from 'antd';
import { MenuOutlined, CloseOutlined, AppstoreAddOutlined, PictureOutlined, PaperClipOutlined, InfoCircleOutlined, ProjectOutlined, AppstoreOutlined, UserOutlined, DashboardOutlined, DollarOutlined, BookOutlined, LineChartOutlined, StockOutlined, SearchOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { SupervisedUserCircle } from '@mui/icons-material';

const { SubMenu } = Menu;
const { Search } = Input;

const menuItems = [
  { key: '/App', label: 'Program', icon: <AppstoreOutlined /> },
  { key: '/App/globaldashboard', label: 'Dashboards', icon: <DashboardOutlined /> },
  // { key: '/App/Report', label: 'Reports', icon: <DashboardOutlined /> },
  { key: '/App/Reportss', label: 'Report', icon: <DashboardOutlined /> },
 
  { key: '/Dasboard', label: "Etats d'avancements", icon: <LineChartOutlined /> },
  { key: '/App/Formation', label: 'Formations', icon: <BookOutlined /> },
  { key: '/petitprojet', label: 'Petits Projets', icon: <ProjectOutlined /> },
  { key: '/App/payrolls', label: 'Payrolls', icon: <DollarOutlined /> },
  { key: '/petitprojet', label: 'Stocks', icon: <StockOutlined /> },
  { key: 'http://docs.google.com/spreadsheets/d/1YJ0xW0mNbZdZ_9HXgN4V_qEQzTBl9Y_U_s51PGx6mkI/edit#gid=197995468', label: 'Suivi des Jalons', icon: <InfoCircleOutlined /> },
  { key: '/App/program/1/composante/1/typeprojet/6/petitprojet/6', label: 'Composante 1', icon: <AppstoreOutlined /> },
  { key: '/App/program/1/composante/2/typeprojet/3/petitprojet/3', label: 'Composante 2', icon: <AppstoreOutlined /> },
  { key: '/App/Apropos2', label: 'Photo', icon: <PictureOutlined /> },
  { key: '/App/Apropos', label: 'À-propos', icon: <PaperClipOutlined /> },
  { key: '/', label: 'Log Out', icon: <UserOutlined /> },
];

<ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
        
      
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="https://docs.google.com/spreadsheets/d/1YJ0xW0mNbZdZ_9HXgN4V_qEQzTBl9Y_U_s51PGx6mkI/edit#gid=197995468"> Suivi-des-Jalons</a>
        </li>
         
           
      </ul> 

function Navleft() {
  const navigate = useNavigate();
  const [hoveredItem, setHoveredItem] = useState(null);

  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [userAvatar, setUserAvatar] = useState(null); 

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setCollapsed(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setUserAvatar(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={`Navleft ${collapsed || isMobile ? 'collapsed' : ''}`}>
      <Button
        type="primary"
        onClick={() => setCollapsed(!collapsed)}
        style={{
          position: 'absolute',
          top: '10px',
          left: 'auto',
          width: '30px',
          zIndex: 1,
          backgroundColor: '#fff',
          color: '#001529',
        }}
        icon={collapsed ? <MenuOutlined /> : <CloseOutlined />}
      />
      <Menu
        onClick={(item) => {
          navigate(item.key);
        }}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        className="responsive-menu"
        style={{ backgroundColor: 'white', display: isMobile && collapsed ? 'none' : 'block' }}
      >

        {/**Photo user */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '8px 0px' }}>
          {userAvatar ? (
            <Avatar size={57} src={userAvatar} />
          ) : (
            <Avatar size={57} icon={<UserOutlined />} />
          )}
          {/*<input type="file" accept="image/*" onChange={handleImageUpload} />*/}
          <p style={{ marginTop: '10px',fontFamily: 'Verdana, sans-serif', marginBottom: '0', color:'blue',fontSize:'10px' }}>user@bash.com</p>
        </div>
        <div className="barre-photo"></div>
        
        <Input
          placeholder="Search..."
          allowClear
          onChange={(e) => setSearchValue(e.target.value)}
          style={{ margin: '2px' }}
        />
        {menuItems
          .filter(item => item.label.toLowerCase().includes(searchValue.toLowerCase()))
          .map((item) => (
            <Menu.Item
              key={item.key}
              icon={item.icon}
              style={{
                color: '#344955',
                backgroundColor: hoveredItem === item.key ? '#EE4266' : 'inherit'
              }}
              onMouseEnter={() => setHoveredItem(item.key)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <p className="nav-left" style={{ fontFamily: 'Verdana, sans-serif' }}>{item.label}</p>

            </Menu.Item>
          ))}
      </Menu>
    </div>
  );
}

export default Navleft;
