import Home from './views/home/Home';
import SignUp from './views/signUp/SignUp';
import Login from './views/login/Login';
import Library from './views/publicLibrary/PublicLibrary';
import Generate from './views/generateMusic/GenerateMusic';
import MusicFile from './views/musicFile/MusicFile';
import Account from './views/accountProfile/Account';
import Security from './views/security/security';
import UserAccount from './views/Account/userAccount';
import MusicList from './views/musicList/musicList';
import Edit from './views/editProfile/editProfile';
import PrivacyAccount from './views/Privacy/userPrivacy';
import UserList from './views/userList/userList';
import SongFile from './views/SongFile/songFile';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useState } from 'react';
import About from './views/about/About';
import './app.css';
import Root from './views/root/Root';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: 'signup',
          element: <SignUp />,
        },
        {
          path: 'login',
          element: <Login />,
        },
        {
          path: 'library',
          element: <Library />,
          children: [
            {
              index: true,
              element: <Library />,
            },
            {
              path: 'song',
              element: <SongFile />,
            },
          ],
        },
        {
          path: 'song/:song_id',
          element: <SongFile />,
        },
        {
          path: 'generate',
          element: <Generate />,
        },
        {
          path: 'review',
          element: <MusicFile />,
        },
        {
          path: 'account',
          element: <Account />,
          children: [
            {
              index: true,
              element: <UserAccount />,
            },
            {
              path: 'musicList',
              element: <MusicList />,
            },
            {
              path: 'edit',
              element: <Edit />,
            },
            {
              path: 'security',
              element: <Security />,
            },
            {
              path: 'userPrivacy',
              element: <PrivacyAccount />,
            },
            {
              path: 'userList',
              element: <UserList />,
            },
          ],
        },
      ],
    },
  ]);
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
