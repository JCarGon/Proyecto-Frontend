import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import logoEmpresa from '../../images/logo.webp';
import search from "../../images/search.webp";
import user from "../../images/user.svg";
import cart from "../../images/cart.svg";
import home from '../../images/home.svg';
import LoginModal from "../Login/LoginModal";
import RegisterModal from "../Register/RegisterModal";
import "./Header.css";

function Header() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();

  const username = localStorage.getItem("username");
  let cartCount = 0;
  const userCartString = localStorage.getItem("userCart");
  if (userCartString) {
    try {
      const cartItems = JSON.parse(userCartString);
      cartCount = cartItems.length;
    } catch (error) {
      console.error("Error al parsear userCart", error);
    }
  }

  const handleUserIconClick = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsLoginModalOpen(true);
    } else {
      setShowDropdown(!showDropdown);
    }
  };

  const logout = async () => {
    try {
      const response = await fetch(`${baseUrl}/v1/logout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.ok || response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("userCart");
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
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/cart");
    } else {
      setIsLoginModalOpen(true);
    }
  };

  const handleOpenSearchModal = () => setIsSearchModalOpen(true);
  const handleCloseSearchModal = () => setIsSearchModalOpen(false);

  const handleSearchSubmit = (e) => {
      e.preventDefault(); // Prevenir el comportamiento por defecto del formulario
      navigate(`/search/character/${searchText}`);
      handleCloseSearchModal();
  };

  useEffect(() => {
    if (isLoginModalOpen) {
      document.querySelector('.header-container-responsive').style.zIndex = '0';
      document.querySelector('.nav-container').style.zIndex = '0';
    } else {
      document.querySelector('.header-container-responsive').style.zIndex = '';
      document.querySelector('.nav-container').style.zIndex = '';
    }
  }, [isLoginModalOpen]);

  useEffect(() => {
    if (isRegisterModalOpen) {
      document.querySelector('.header-container-responsive').style.zIndex = '0';
      document.querySelector('.nav-container').style.zIndex = '0';
    } else {
      document.querySelector('.header-container-responsive').style.zIndex = '';
      document.querySelector('.nav-container').style.zIndex = '';
    }
  }, [isRegisterModalOpen]);

  return (
    <div>
      <div className="header-container">
        <Link to="/">
          <p className="nombreEmpresa">FRIKILEVEL</p>
        </Link>
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
          <img
            src={user}
            alt="icono inicio de sesión"
            className={username ? "user-img-logged-in" : "user-img"}
          />
          <div className="username-welcome">
            {username ? `Hola, ${username}` : "Iniciar sesión"}
          </div>
          {showDropdown && (
            <div className="user-dropdown">
              <Link to="/userPage">Página de usuario</Link>
              <button onClick={logout}>Cerrar sesión</button>
            </div>
          )}
        </div>
        <div className="cart-icon" onClick={handleCartClick}>
          <img src={cart} alt="icono de carrito" />
          {cartCount > 0 && <div className="cart-counter">{cartCount}</div>}
        </div>
        {isLoginModalOpen && (
          <LoginModal
            onClose={handleLoginModalClose}
            onRegisterClick={handleRegisterModalOpen}
          />
        )}
        {isRegisterModalOpen && (
          <RegisterModal onClose={handleRegisterModalClose} />
        )}
      </div>
      <div className="header-container-responsive">
        <Link to="/">
          <img className="go-home" alt="icono de una casa para ir a Inicio" src={home} />
        </Link>
        <div className="search-bar-responsive">
          <input
            type="text"
            placeholder=""
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button className="search" onClick={handleOpenSearchModal}>
            <img src={search} alt="icono de búsqueda" />
          </button>
        </div>
        <Link to="/">
          <img className="logo-header-responsive" src={logoEmpresa} alt="logoEmpresa"/>
        </Link>
        <div className="user-icon-responsive" onClick={handleUserIconClick}>
          <img className="user-responsive" alt="icono de usuario para iniciar sesión o ir al perfil" src={user} />
          {showDropdown && (
            <div className="user-dropdown">
              <Link to="/userPage">Página de usuario</Link>
              <button onClick={logout}>Cerrar sesión</button>
            </div>
          )}
        </div>
        <div className="cart-icon-responsive" onClick={handleCartClick}>
          <img className="usercart-responsive" alt="icono del carrito del usuario" src={cart} />
          {cartCount > 0 && <div className="cart-counter-responsive">{cartCount}</div>}
        </div>
      </div>
      {isSearchModalOpen && (
        <div className="search-overlay">
          <div className="search-modal">
            <form onSubmit={handleSearchSubmit}>
              <input
                type="text"
                placeholder="Buscar..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                autoFocus
              />
              <div className="buttons-container">
                <button type="submit">Buscar</button>
                <button onClick={handleCloseSearchModal}>Cerrar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
