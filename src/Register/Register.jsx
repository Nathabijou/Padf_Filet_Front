


import 'bootstrap/dist/css/bootstrap.min.css';


import {BrowserRouter as Router,Routes,Route} from "react-router-dom";


import { Space, Typography } from 'antd';

import { useState } from 'react';
import axios from 'axios';
import { useBaseUrl } from '../BaseUrl';


function Register() {
    const baseUrl = useBaseUrl(); 

    const [username , setUsername] =useState("");

    const [email , setEmail] = useState("");

    const [password, setPassword] =useState("");

    async function save(event){
        event.preventDefault();

        try{
            await axios.post(`${baseUrl}/api/v1/user/save`, {
                username: username, email: email, password:password,
            });
            alert("User  Registration successfully");

        }
        catch(err){
            alert(err);
        }
    }

  return (
    <div>
    
    <div  className='container mt-4'>
        <div className='Card'>

        <h1>User Registration</h1>

        <form>
            <div className='form-group'>
                <label> User name</label>
                <input type='text' class='form-control' id='username' placeholder='entrer nom complet'
                
                value={username}
                onChange={(event)=>{
                    setUsername(event.target.value);
                }}

               />
            </div>

            <div className='form-group'>
                <label>email</label>
                <input type='email' 
                class='form-control'
                 id='email'
                  placeholder='entrer email'
                
                value={email}
                onChange={(event)=>{
                    setEmail(event.target.value);
                }}

               />
            </div>

            <div className='form-group'>
                <label>Password</label>
                <input type='password' 
                class='form-control' 
                id='password' 
                placeholder='entrer password'
                
                value={password}
                onChange={(event)=>{
                    setPassword(event.target.value);
                }}

               />
            </div>


            <button type='submit' class="btn btn-primary mt-4" onClick={save}> save</button>

        </form>

        </div> 
    
    </div>
    </div>

    
  );
}

export default Register;





