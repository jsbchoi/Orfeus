import logo from './logo.svg';
import { BrowserRouter, Router,Route, Routes } from 'react-router-dom';
import SignUp from './signUp/SignUp'
import Login from './login/Login'
import './app.css';

const App = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignUp/>}/>
          <Route path="/signUp" element={<SignUp/>}/>
          <Route path="/login" element={<Login/>}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
