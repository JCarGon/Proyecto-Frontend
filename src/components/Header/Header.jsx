import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import search from "../../images/search.webp";
import user from "../../images/user.svg";
import cart from "../../images/cart.svg";
import LoginModal from "../Login/LoginModal";
import RegisterModal from '../Register/RegisterModal';
import "./Header.css";

function Header() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  const handleUserIconClick = () => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/userPage');
    } else {
      setIsLoginModalOpen(true);
    }
  };

  const handleLoginModalClose = () => {
    setIsLoginModalOpen(false);
  };

  const handleRegisterModalOpen = () => {
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(true);
  };

  const handleRegisterModalClose = () => {
    setIsRegisterModalOpen(false);
  };

  const handleSearchClick = () => {
    navigate(`/search/character/${searchText}`);
  };

  return (
    <div className="header-container">
      <Link to="/"><p className="nombreEmpresa">FRIKILEVEL</p></Link>
      <div className="search-bar">
      <input 
          type="text" 
          placeholder="Buscar una figura por nombre..."
          value={searchText} 
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button className="search" onClick={handleSearchClick}>
          <img src={search} alt="icono de búsqueda" />
        </button>
      </div>
      <div className="user-icon" onClick={handleUserIconClick}>
        <img src={user} alt="icono inicio de sesión" />
      </div>
      <div className="cart-icon">
        <Link to="/cart"><img src={cart} alt="icono de carrito" /></Link>
      </div>
      {isLoginModalOpen && <LoginModal onClose={handleLoginModalClose} onRegisterClick={handleRegisterModalOpen} />}
      {isRegisterModalOpen && <RegisterModal onClose={handleRegisterModalClose} />}
    </div>
  );
}

export default Header;
