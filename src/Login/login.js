import axios from "axios";
import './login.css'; 
import { Link } from 'react-router-dom';
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import im from './pa.png';
import { useBaseUrl } from "../BaseUrl";

function Login() {
  const baseUrl = useBaseUrl();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function login(event) {
    event.preventDefault();
    try {
      const response = await axios.post(`http://localhost:8080/api/v1/user/login`, {
        email: email,
        password: password,
      });
  
      console.log("Response from server:", response.data);
  
      if (response.data.message === "Login réussi") {
        navigate("/App");
      } else if (response.data.message === "Email not exists") {
        alert("L'email n'existe pas");
      } else {
        alert("Email et mot de passe incorrects");
      }
      
    } catch (err) {
      console.error(err);
      alert("Une erreur s'est produite lors de la tentative de connexion. Veuillez réessayer plus tard.");
    }
  }
  

  return (
    <div className="wrapper">
      <div className="logo">
        <img width={150} src={im} alt="Logo" />
      </div>
      <div className="text-center mt-4 name">
        Enter email & password
      </div>

      <form className="p-3 mt-3">
        <div className="form-field d-flex align-items-center">
          <i className="bi bi-person-fill"></i>
          <input type="text" 
            name="userName" 
            id="userName" 
            placeholder="Email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
        </div>
        <div className="form-field d-flex align-items-center">
          <i className="bi bi-lock-fill"></i>
          <input type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </div>

        <button type="submit" className="btn btn-primary" onClick={login}>
          Login
        </button>
      </form>

      <div className="text-center fs-6">
        <a href="/">Forget password?</a>
      </div>
    </div>
  );
}

export default Login;
