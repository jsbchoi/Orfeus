import Home from "./views/home/Home";
import SignUp from "./views/signUp/SignUp";
import Login from "./views/login/Login";
import Library from "./views/publicLibrary/PublicLibrary";
import Generate from "./views/generateMusic/GenerateMusic";
import MusicFile from "./views/musicFile/MusicFile";
import Account from "./views/accountProfile/Account";
import Security from "./views/security/security";
import UserAccount from "./views/Account/userAccount";
import MusicAccount from "./views/musicList/musicList";
import PrivacyAccount from "./views/Privacy/userPrivacy";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import About from "./views/about/About";

import "./app.css";
import Root from "./views/root/Root";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "home",
          element: <Home />,
        },
        {
          path: "signup",
          element: <SignUp />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "library",
          element: <Library />,
        },
        {
          path: "generate",
          element: <Generate />,
        },
        {
          path: "review",
          element: <MusicFile />,
        },
        {
          path: "account",
          element: <Account />,
          children: [
            {
              path: "musicList",
              element: <MusicAccount />,
            },
            {
              path: "userAccount",
              element: <UserAccount />,
            },
            {
              path: "security",
              element: <Security />,
            },
            {
              path: "userPrivacy",
              element: <PrivacyAccount />,
            },
          ],
        },
        {
          path: "about",
          element: <About />,
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
