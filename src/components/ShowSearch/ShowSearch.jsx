import React, { useState, useEffect } from "react";
import Product from '../Product/Product';
import Loader from "../Loader/Loader";
import './ShowSearch.css';

function ShowSearch({ name }) {
  const [figureList, setFigureList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchFigures = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`http://localhost:7000/v1/figures?name=${name}`);
        const data = await response.json();
        setFigureList(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching figures data:", error);
        setIsLoading(false);
      }
    };

    if (name) {
      fetchFigures();
    }
  }, [name]);

  return (
    <div className="show-search">
      <h2 className="search-title">Resultado de la búsqueda para: "{name}"</h2>
      {isLoading ? (
        <Loader />
      ) : figureList.length > 0 ? (
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
