import React, { useState, useEffect } from "react";

function ViewProduct({ pokedexId }) {
  const [pokemonData, setPokemonData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokedexId}`);
        const data = await response.json();
        setPokemonData(data);
      } catch (error) {
        console.error("Error fetching Pokemon data:", error);
      }
    };

    fetchData();
  }, [pokedexId]);

  if (!pokemonData) {
    return <div>Cargando...</div>;
  }

  const { id, name, sprites } = pokemonData;

  return (
    <div className="product-container">
      <img className="product-image" src={sprites.front_default} alt={name} />
      <div className="product-title">{name}</div>
      <div className="product-price">Pokédex #{id}</div>
    </div>
  );
}

export default ViewProduct;
