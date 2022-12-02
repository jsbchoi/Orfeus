<<<<<<< HEAD
import Login from "./components/login/Login";

import "./app.scss"
import React, {useState} from 'react'



function App() {
  const[menuOpen,setMenuOpen] = useState(false)
  return (
    <div className="app">
      <Topbar menuOpen ={menuOpen} setMenuOpen = {setMenuOpen}/>
      <Menu menuOpen ={menuOpen} setMenuOpen = {setMenuOpen}/>
      <div className= "sections">
        <Login/>
      </div>
    </div>
=======
import logo from './logo.svg';
import { BrowserRouter, Router,Route, Routes } from 'react-router-dom';
import Home from './home/Home'
import SignUp from './signUp/SignUp'
import Login from './login/Login'
import Library from './publicLibrary/PublicLibrary'
import Generate from './generateMusic/GenerateMusic'

import './app.css';

const App = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/signUp" element={<SignUp/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/library" element={<Library/>}/>
          <Route path="/generate" element={<Generate/>}/>
        </Routes>
    </BrowserRouter>
>>>>>>> main
  );
}

export default App;
