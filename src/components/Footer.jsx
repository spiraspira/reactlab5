import React, { Component } from "react";
import { Typography } from "@material-ui/core";

class Footer extends Component {
  render() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        © 2024 Агентство недвижимости
      </Typography>
    );
  }
}

export default Footer;