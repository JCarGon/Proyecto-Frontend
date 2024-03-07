import React, { useState, useEffect } from "react";
import LoginModal from '../Login/LoginModal';
import Loader from "../Loader/Loader";
import './ViewProduct.css';

function ViewProduct({ figureId }) {
  const [figureData, setFigureData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const discount = 0.8;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`http://localhost:7000/v1/figures/${figureId}`);
        const data = await response.json();
        setFigureData(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching figure data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [figureId]);

  const addToCart = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setIsLoginModalOpen(true);
      return;
    }

    try {
      const response = await fetch(`http://localhost:7000/v1/users/figures/${figureId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        const currentCart = localStorage.getItem('userCart');
        const cartItems = currentCart ? JSON.parse(currentCart) : [];
        if (!cartItems.includes(figureId)) {
          cartItems.push(figureId);
          localStorage.setItem('userCart', JSON.stringify(cartItems));
        }
        alert("Figura añadida al carrito");
        window.location.reload();
      } else if (response.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('userCart');
        alert("Sesión expirada. Inicie sesión de nuevo.");
        setIsLoginModalOpen(true);
      } else if (response.status === 409) {
        alert("Ya tienes esta figura en el carrito, solo puedes añadirla una vez");
      }
    } catch (error) {
      console.error("Error al añadir al carrito:", error);
      alert("Ha habido un error al añadir la figura al carrito. Inténtelo de nuevo más tarde.")
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  const { name, character, company, price, dimensions, material, brand, principalImage, amount } = figureData;

  return (
    <div className="view-container">
      <img className="view-image" src={`/resources/figures/${principalImage}`} alt={name} />
      <div className="view-title">{name}</div>
      <div className="view-character">Personaje: {character}</div>
      <div className="view-company">Franquicia: {company}</div>
      <div className="view-price">Precio: {(price*discount).toFixed(2)}€ <span>(PVP: {price}€)</span></div>
      <div className="view-dimensions">Dimensiones: {dimensions}</div>
      <div className="view-material">Materiales: {material}</div>
      <div className="view-brand">Marca: {brand}</div>
      <div className="view-amount">Existencias: {amount}</div>
      <button className="addToCart" onClick={addToCart}>
        <span>Añadir al carrito</span>
      </button>
      {isLoginModalOpen && <LoginModal onClose={() => setIsLoginModalOpen(false)} />}
    </div>
  );
}

export default ViewProduct;
