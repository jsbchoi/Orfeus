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
  );
}

export default App;
