import { BrowserRouter,Route, Routes } from 'react-router-dom';
import Home from './home/Home'
import SignUp from './signUp/SignUp'
import Login from './login/Login'
import Library from './publicLibrary/PublicLibrary'
import Generate from './generateMusic/GenerateMusic'
import MusicFile from './musicFile/MusicFile'
import Account from "./accountProfile/Account";
import About from "./about/About";

import "./app.css";

const App = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/signUp" element={<SignUp/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/library" element={<Library/>}/>
          <Route path="/generate" element={<Generate/>}/>
          <Route path="/musicFile" element={<MusicFile/>}/>
        <Route path="/account" element={<Account />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
