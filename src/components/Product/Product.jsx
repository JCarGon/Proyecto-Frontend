import React from "react";
import { Link } from 'react-router-dom';
import "./Product.css";

function Product({ pokemon }) {
  const pokedexNumber = pokemon.id;
  const name = pokemon.name;
  const sprite = pokemon.sprites.front_default;

  return (
    <div className="product-container">
      <Link to={`/products/${pokedexNumber}`}>
        <img className="product-image" src={sprite} alt={name} />
        <div className="product-title">{name}</div>
        <div className="product-price">Pokédex #{pokedexNumber}</div>
      </Link>
    </div>
  );
}

export default Product;
