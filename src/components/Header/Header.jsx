import React from "react";
import { Link } from 'react-router-dom';
import logo from "../../resources/logo.png";
import search from "../../resources/search.png";
import user from "../../resources/user.svg";
import cart from "../../resources/cart.svg";
import "./Header.css";

function Header() {
  return (
    <div className="header-container">
      <Link to="/"><img src={logo} alt="logo de la empresa" /></Link>
      <div className="search-bar">
        <input type="text" placeholder="Buscar..."></input>
        <div className="search"><img src={search} alt="icono de búsqueda" /></div>
      </div>
      <div className="user-icon">
        <Link to="/login"><img src={user} alt="icono inicio de sesión" /></Link>
      </div>
      <div className="cart-icon">
        <Link to="/cart"><img src={cart} alt="icono de carrito" /></Link>
      </div>
    </div>
  );
}

export default Header;
