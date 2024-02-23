import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import logo from "../../images/logo.png";
import search from "../../images/search.png";
import user from "../../images/user.svg";
import cart from "../../images/cart.svg";
import LoginModal from "../Login/LoginModal";
import "./Header.css";

function Header() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleUserIconClick = () => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/userPage');
    } else {
      setIsLoginModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsLoginModalOpen(false);
  };

  return (
    <div className="header-container">
      <Link to="/"><img src={logo} alt="logo de la empresa" /></Link>
      <div className="search-bar">
        <input type="text" placeholder="Buscar..."></input>
        <div className="search"><img src={search} alt="icono de búsqueda" /></div>
      </div>
      <div className="user-icon" onClick={handleUserIconClick}>
        <img src={user} alt="icono inicio de sesión" />
      </div>
      <div className="cart-icon">
        <Link to="/cart"><img src={cart} alt="icono de carrito" /></Link>
      </div>
      {isLoginModalOpen && <LoginModal onClose={handleCloseModal} />}
    </div>
  );
}

export default Header;
