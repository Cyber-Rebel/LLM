import React from 'react';
import {  Routes, Route } from 'react-router-dom';
import Login from './page/Login.jsx';
import Home from './page/Home.jsx';
import Register from './page/Register.jsx';
import ChatMessages from './components/chat/ChatMessages.jsx';

const Mainrouter = () => (
    
    
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
        </Routes>

);

export default Mainrouter;

