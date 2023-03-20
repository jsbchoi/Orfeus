import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
//for the mui for navbar/appbar
import { useState, useEffect } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import root_styles from "./Root.module.css";
import jwt_decode from "jwt-decode";

const pages = ["Home", "About", "Library", "Login", "Signup"];

const Root = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [decodedToken, setDecodedToken] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken != null) {
      setLoggedIn(true);
      const decoded = jwt_decode(accessToken);
      setDecodedToken(decoded);
    } else {
      setLoggedIn(false);
      setDecodedToken(null);
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    setLoggedIn(false);
    setDecodedToken(null);
  };
  const navigate = useNavigate();
  const handleHomepageClick = () => {
    navigate("/");
  };
  const handleAboutpageClick = () => {
    navigate("/about");
  };
  const handleLibrarypageClick = () => {
    navigate("/library");
  };
  const handleLoginpageClick = () => {
    navigate("/login");
  };
  const handleSignuppageClick = () => {
    navigate("/signup");
  };

  return (
    <div>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              ORFEUS
            </Typography>
            <Box sx={{ flexGrow: 1, display: { md: "flex" } }}>
              <Button
                sx={{ my: 2, color: "white", display: "block" }}
                onClick={handleHomepageClick}
              >
                Home
              </Button>
              <Button
                sx={{ my: 2, color: "white", display: "block" }}
                onClick={handleAboutpageClick}
              >
                About
              </Button>
              <Button
                sx={{ my: 2, color: "white", display: "block" }}
                onClick={handleLibrarypageClick}
              >
                Library
              </Button>
              <Button
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  justifySelf: "flex-end",
                }}
                onClick={handleLoginpageClick}
              >
                Login
              </Button>
              <Button
                sx={{ my: 2, color: "white", display: "block" }}
                onClick={handleSignuppageClick}
              >
                Signup
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Root;
