import React, { Component } from "react";
import { Link } from "react-router-dom";

class Header extends Component {
  render() {
    return (
      <header className="header">
        <h1 className="header-title">Агентство недвижимости</h1>
        <nav className="header-nav">
          <Link className="header-link" to="/">Недвижимость</Link>
          <Link className="header-link" to="/testimonials">Отзывы</Link>
          <Link className="header-link" to="/messages">Обратная связь</Link>
        </nav>
      </header>
    );
  }
}

export default Header;