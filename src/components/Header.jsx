import React from "react";
import { AppBar, Toolbar, Typography, Link, makeStyles } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";

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

  return (
    <AppBar position="static">
      <Toolbar className={classes.header}>
        <Typography variant="h6" component="h1" style={{ color: "#ffffff" }}>
          Агентство недвижимости
        </Typography>
        <nav>
          <Link
            component={RouterLink}
            to="/"
            className={classes.headerLink}
          >
            Недвижимость
          </Link>
          <Link
            component={RouterLink}
            to="/testimonials"
            className={classes.headerLink}
          >
            Отзывы
          </Link>
          <Link
            component={RouterLink}
            to="/messages"
            className={classes.headerLink}
          >
            Обратная связь
          </Link>
        </nav>
      </Toolbar>
    </AppBar>
  );
};

export default Header;