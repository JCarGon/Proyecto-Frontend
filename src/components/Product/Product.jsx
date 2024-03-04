import React from "react";
import { Link } from 'react-router-dom';
import "./Product.css";

function Product({ figure }) {
  const { _id, name, price, principalImage, animeName } = figure;
  const discount = 0.8;
  return (
    <div className="product-container">
      <Link to={`/animes/${animeName}/${_id}`}>
        <img className="product-image" src={`/resources/figures/${principalImage}`} alt={name} />
      </Link>
      <p className="product-title">{name}</p>
      <div className="product-info">
        <p className="product-price">Precio: {(price*discount).toFixed(2)}€ <span className="discount-price">(PVP: {price}€)</span> </p>
      </div>
    </div>
  );
}

export default Product;
