import React, { useState, useEffect } from "react";
import Product from '../Product/Product';
import promoImage from '../../resources/promoImage.png';
import './PrincipalContainer.css';

function PrincipalContainer() {
  const [pokemonList, setPokemonList] = useState([]);
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const itemsPerPage = 2;

  useEffect(() => {
    const fetchInitialPokemon = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${itemsPerPage * 2}`);
        const data = await response.json();
        const results = data.results;

        const pokemonData = await Promise.all(results.map(async (pokemon) => {
          const response = await fetch(pokemon.url);
          return await response.json();
        }));

        setPokemonList(pokemonData);
        setNextPageUrl(data.next);
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
      }
    };

    fetchInitialPokemon();
  }, []);

  const loadMore = async () => {
    if (nextPageUrl) {
      try {
        const response = await fetch(nextPageUrl);
        const data = await response.json();
        const results = data.results;

        const pokemonData = await Promise.all(results.map(async (pokemon) => {
          const response = await fetch(pokemon.url);
          return await response.json();
        }));

        setPokemonList([...pokemonList, ...pokemonData]);
        setNextPageUrl(data.next);
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
      }
    }
  };

  const createRows = (list, itemsPerRow) => {
    const rows = [];
    for (let i = 0; i < list.length; i += itemsPerRow) {
      rows.push(list.slice(i, i + itemsPerRow));
    }
    return rows;
  };

  const rows = createRows(pokemonList, itemsPerPage);

  return (
    <div>
      <img className="promo-image" src={promoImage} alt="imagen de promoción por nueva apertura"></img>
      
      {rows.map((row, rowIndex) => (
        <div className="product-row" key={rowIndex}>
          {row.map((pokemon, index) => (
            <Product key={index} pokemon={pokemon} />
          ))}
        </div>
      ))}

      <div className="button-container">
        <button className="loadMoreButton" onClick={loadMore}>
          <span>Cargar más</span>
        </button>
      </div>
    </div>
  );
}

export default PrincipalContainer;
