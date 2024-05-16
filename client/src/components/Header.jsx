import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Link,
  makeStyles,
  Button,
} from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import ChangePasswordForm from "./authorization/ChangePasswordForm";

const useStyles = makeStyles((theme) => ({
  header: {
    flexDirection: "column",
  },
  headerLink: {
    color: "#ffffff",
    padding: theme.spacing(1),
  },
}));

const Header = () => {
  const classes = useStyles();
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    // Remove token and role from local and session storage
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("role");
    // Navigate to "/login"
    window.location.href = "/login";
  };

  const handleOpenChangePassword = () => {
    setChangePasswordOpen(true);
  };

  const handleCloseChangePassword = () => {
    setChangePasswordOpen(false);
  };

  return (
    <AppBar position="static">
      <Toolbar className={classes.header}>
        <Typography variant="h6" component="h1" style={{ color: "#ffffff" }}>
          Агентство недвижимости
        </Typography>
        <nav>
          <Link component={RouterLink} to="/" className={classes.headerLink}>
            Недвижимость
          </Link>
          <Link component={RouterLink} to="/testimonials" className={classes.headerLink}>
            Отзывы
          </Link>
          <Link component={RouterLink} to="/messages" className={classes.headerLink}>
            Обратная связь
          </Link>
          {isLoggedIn && (
            <>
              <Button color="inherit" onClick={handleOpenChangePassword}>
                Change Password
              </Button>
              <Button color="inherit" onClick={handleLogout}>
                Log Out
              </Button>
            </>
          )}
        </nav>
      </Toolbar>
      <ChangePasswordForm
        open={changePasswordOpen}
        handleClose={handleCloseChangePassword}
      />
    </AppBar>
  );
};

export default Header;