import React, { useState, useEffect } from "react";
import Product from '../Product/Product';
import './ShowSearch.css';

function ShowSearch({ name }) {
  const [figureList, setFigureList] = useState([]);

  useEffect(() => {
    const fetchFigures = async () => {
      try {
        const response = await fetch(`http://localhost:7000/v1/figures?name=${name}`);
        const data = await response.json();
        setFigureList(data);
      } catch (error) {
        console.error("Error fetching figures data:", error);
      }
    };

    if (name) {
      fetchFigures();
    }
  }, [name]);

  return (
    <div className="show-search">
      <h2 className="search-title">Resultado de la búsqueda para: "{name}"</h2>
      {figureList.length > 0 ? (
        figureList.map((figure, index) => (
          <Product key={index} figure={figure} />
        ))
      ) : (
        <p>No se encontraron figuras del personaje "{name}".</p>
      )}
    </div>
  );
}

export default ShowSearch;
