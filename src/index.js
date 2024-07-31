import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login1 from './Register/Login1';
import App from './App';

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<Login1 />} />
      <Route path="/App/*" element={<App />} />
    </Routes>
  </Router>,
  document.getElementById('root')
);

