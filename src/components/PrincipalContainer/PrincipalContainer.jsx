import React, { useState, useEffect } from "react";
import Product from '../Product/Product';
import promoImage from '../../resources/promoImage.png';
import './PrincipalContainer.css';

function PrincipalContainer() {
  const [figureList, setFigureList] = useState([]);
  const [page, setPage] = useState(1);
  const pageSize = 4;

  useEffect(() => {
    const fetchInitialFigures = async () => {
      try {
        const response = await fetch(`http://localhost:7000/v1/figures?page=${page}&pageSize=${pageSize}`);
        const data = await response.json();

        setFigureList(data);
      } catch (error) {
        console.error("Error fetching figures data:", error);
      }
    };

    fetchInitialFigures();
  }, []);

  const loadMore = async () => {
    try {
      const nextPage = page + 1;
      const response = await fetch(`http://localhost:7000/v1/figures?page=${nextPage}&pageSize=${pageSize}`);
      const data = await response.json();

      setFigureList([...figureList, ...data]);
      setPage(nextPage);
    } catch (error) {
      console.error("Error fetching more figures data:", error);
    }
  };

  const createRows = (list, itemsPerRow) => {
    const rows = [];
    for (let i = 0; i < list.length; i += itemsPerRow) {
      rows.push(list.slice(i, i + itemsPerRow));
    }
    return rows;
  };

  const rows = createRows(figureList, pageSize);

  return (
    <div>
      <img className="promo-image" src={promoImage} alt="imagen de promoción por nueva apertura"></img>
      
      {rows.map((row, rowIndex) => (
        <div className="product-row" key={rowIndex}>
          {row.map((figure, index) => (
            <Product key={index} figure={figure} />
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
