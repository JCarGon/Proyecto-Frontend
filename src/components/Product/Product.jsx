import React from "react";
import { Link } from 'react-router-dom';
import "./Product.css";

function Product({ figure }) {
  const { _id, name, price, principalImage, animeName } = figure;
  return (
    <div className="product-container">
      <Link to={`/animes/${animeName}/${_id}`}>
        <img className="product-image" src={`/resources/figures/${principalImage}`} alt={name} />
        <div className="product-title">{name}</div>
        <div className="product-price">Precio: {price}€</div>
      </Link>
    </div>
  );
}

export default Product;
