/* eslint-disable import/no-anonymous-default-export */
import React from 'react'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import AppHeader from '../Pages/AppHeader'

import DropdownProfiles from './DropdownProfiles'
import { useState } from 'react'


export default function(){
   const [openProfles, setOpenProfiles] = useState(false);

  return (

    <div className=''>

<nav className="navbar navbar-expand navbar-dark pt navcol">
  <div className="container-fluid">
      <AppHeader/>
      
                <Link className="navbar-brand" to="/App" > 
                    <a href="#" className="nav-link text-white fs-5 mx-4" aria-current="page">
                      <i className='bi bi-house-fill'></i>
                    </a>   
               </Link> 
 {/**
    <div className="collapse navbar-collapse " >
      <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
        
      
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="https://docs.google.com/spreadsheets/d/1YJ0xW0mNbZdZ_9HXgN4V_qEQzTBl9Y_U_s51PGx6mkI/edit#gid=197995468"> Suivi-des-Jalons</a>
        </li>
         
           
      </ul>  
    </div>
 */}
    <form className="d-flex">
        <input className="form-control me-1 " type="search" placeholder="Search" /> 
    </form>

   {/* 
    <ul className="navbar-nav me-auto mb-1 mb-lg-0 ">
          <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/App/Apropos">Àpropos</a>
                
          </li>
    </ul>
             
    <span className='text-2x1 font-semibold cursor-pointer' onClick={() => setOpenProfiles((prev)=>!prev)}>
      
    <ul className="navbar-nav me-auto mb-1 mb-lg-0">
        
    </ul>

   </span>
  */}

<i class="bi bi-gear"></i>
    {
      openProfles && <DropdownProfiles/>
    }
    

    </div>
  </nav>
</div>
)
}
