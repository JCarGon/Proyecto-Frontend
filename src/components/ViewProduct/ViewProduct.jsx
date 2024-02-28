import React, { useState, useEffect } from "react";
import LoginModal from '../Login/LoginModal';

function ViewProduct({ figureId }) {
  const [figureData, setFigureData] = useState(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:7000/v1/figures/${figureId}`);
        const data = await response.json();
        console.log(data);
        setFigureData(data);
      } catch (error) {
        console.error("Error fetching figure data:", error);
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
        alert("Figura añadida al carrito");
      } else if (response.status === 401) {
        setIsLoginModalOpen(true);
      } else if (response.status === 409) {
        alert("Ya tienes esta figura en el carrito, solo puedes añadirla una vez");
      }
    } catch (error) {
      console.error("Error al añadir al carrito:", error);
    }
  };

  if (!figureData) {
    return <div>Cargando...</div>;
  }

  const { name, character, company, price, dimensions, material, brand, principalImage, amount } = figureData;

  return (
    <div className="product-container">
      <img className="product-image" src={`/resources/figures/${principalImage}`} alt={name} />
      <div className="product-title">{name}</div>
      <div className="product-character">Personaje: {character}</div>
      <div className="product-company">Franquicia: {company}</div>
      <div className="product-price">Precio: {price}€</div>
      <div className="product-dimensions">Dimensiones: {dimensions}</div>
      <div className="product-material">Materiales: {material}</div>
      <div className="product-brand">Marca: {brand}</div>
      <div className="product-amount">Existencias: {amount}</div>
      <button className="addToCart" onClick={addToCart}>Añadir al carrito</button>
      {isLoginModalOpen && <LoginModal onClose={() => setIsLoginModalOpen(false)} />}
    </div>
  );
}

export default ViewProduct;
