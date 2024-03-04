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
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleUserIconClick = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setIsLoginModalOpen(true);
    } else {
      setShowDropdown(!showDropdown);
    }
  };

  const logout = async () => {
    try {
      const response = await fetch("http://localhost:7000/v1/logout", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.ok) {
        localStorage.removeItem('token');
        alert("Sesión cerrada correctamente. Volviendo a la página de inicio.");
        navigate("/");
      }
    } catch (error) {
      console.error("Error al cerrar sesión", error);
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

  const handleCartClick = () => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/cart');
    } else {
      setIsLoginModalOpen(true);
    }
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
        {showDropdown && (
          <div className="user-dropdown">
            <Link to="/userPage">Página de usuario</Link>
            <button onClick={logout}>Cerrar sesión</button>
          </div>
        )}
      </div>
      <div className="cart-icon" onClick={handleCartClick}>
        <img src={cart} alt="icono de carrito" />
      </div>
      {isLoginModalOpen && <LoginModal onClose={handleLoginModalClose} onRegisterClick={handleRegisterModalOpen} />}
      {isRegisterModalOpen && <RegisterModal onClose={handleRegisterModalClose} />}
    </div>
  );
}

export default Header;
