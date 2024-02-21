import React, { useState, useEffect } from "react";

function ViewProduct({ figureId }) {
  const [figureData, setFigureData] = useState(null);

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

  if (!figureData) {
    return <div>Cargando...</div>;
  }

  const { name, character, company, price, dimensions, material, brand, principalImage } = figureData;

  return (
    <div className="product-container">
      <img className="product-image" src={`/resources/figures/${principalImage}`} alt={name} />
      <div className="product-title">{name}</div>
      <div className="product-character">Character: {character}</div>
      <div className="product-company">Company: {company}</div>
      <div className="product-price">Precio: {price}€</div>
      <div className="product-dimensions">Dimensions: {dimensions}</div>
      <div className="product-material">Material: {material}</div>
      <div className="product-brand">Brand: {brand}</div>
    </div>
  );
}

export default ViewProduct;
