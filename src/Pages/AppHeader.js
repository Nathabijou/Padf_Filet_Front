import React from 'react'
import { Img,Space,Typography } from 'antd'
import {BellFilled, MailOutlined} from '@ant-design/icons'
import im from './image/padflogoblanc.png';


import { Link } from 'react-router-dom';
import { Badge } from 'antd';


 

function AppHeader() {
  return (
    <div className='AppHeader'>  
    <Link to="https://www.padf.org/haiti/" > <img   width={100} src={im}></img>  </Link> 
 </div>
  ); 
}

export default AppHeader
