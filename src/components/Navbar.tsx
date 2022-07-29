import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { initLogin, onLogoutSuccess } from "../reducer";

const ResponsiveAppBar = (): React.ReactElement => {
  const isLoggedIn = useSelector((state: any) => state?.flicker?.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(onLogoutSuccess());
    setTimeout(() => {
      localStorage.setItem("loggedIn", "");
      navigate("/");
    }, 0);
  };

  const handleOpen = () => {
    dispatch(initLogin());
  };
  return (
    <>
      <AppBar position="static" style={{}}>
        <Container
          maxWidth="xl"
          style={{
            display: "flex",
            justifyContent: "center",
            background: "black",
          }}
        >
          <Toolbar disableGutters style={{ display: "flex", width: "80%" }}>
            <Typography
              variant="h6"
              noWrap
              component="a"
              onClick={() => {
                navigate("/");
              }}
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                color: "#fff",
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>

            <Box marginLeft="15px" marginRight={"15px"}>
              <Link to="/" style={{ color: "white" }}>
                Home
              </Link>
            </Box>
            {isLoggedIn ? (
              <Box marginLeft="15px" marginRight={"15px"}>
                <Link to="/user" style={{ color: "white" }}>
                  My Account
                </Link>
              </Box>
            ) : null}
            <Box sx={{ flexGrow: 0, marginLeft: "auto" }}>
              {!isLoggedIn ? (
                <Button variant="contained" onClick={handleOpen}>
                  Login
                </Button>
              ) : (
                <Button variant="contained" onClick={logout}>
                  Logout
                </Button>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};
export default ResponsiveAppBar;
