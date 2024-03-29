import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import Header from '../Header/Header';
import Nav from '../Nav/Nav';
import Product from "../Product/Product";
import Loader from "../Loader/Loader";
import Footer from '../Footer/Footer';
import './AnimePage.css';

function AnimePage() {
  const [figureList, setFigureList] = useState([]);
  const [isLoadingInitial, setIsLoadingInitial] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const pageSize = 4;
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const { animeName } = useParams() || {};

  useEffect(() => {
    const fetchInitialFigures = async () => {
      try {
        const animeQueryParam = animeName && !isHomePage ? `&animeName=${animeName}` : '';
        const response = await fetch(`${baseUrl}/v1/figures?page=${page}&pageSize=${pageSize}${animeQueryParam}`);
        const data = await response.json();
        setFigureList(data);
      } catch (error) {
        console.error("Error fetching figures data:", error);
      } finally {
        setIsLoadingInitial(false);
      }
    };

    fetchInitialFigures();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animeName, isHomePage]);

  const loadMore = async () => {
    setIsLoadingMore(true);
    try {
      const nextPage = page + 1;
      const animeQueryParam = animeName && !isHomePage ? `&animeName=${animeName}` : '';
      const response = await fetch(`${baseUrl}/v1/figures?page=${nextPage}&pageSize=${pageSize}${animeQueryParam}`);
      const data = await response.json();

      setFigureList(prevFigures => [...prevFigures, ...data]);
      setPage(nextPage);
    } catch (error) {
      console.error("Error fetching more figures data:", error);
    } finally {
      setIsLoadingMore(false);
    }
  };

  if (isLoadingInitial) {
    return <Loader />;
  }

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
      <Header />
      <Nav />
      <div className="animePage-container">
        <img className="animeName-image" src={`/resources/images/${animeName}.webp`} alt="imagen del anime al que pertenecen las figuras"></img>
      </div>
      {rows.map((row, rowIndex) => (
        <div className="product-row" key={rowIndex}>
          {row.map((figure, index) => (
            <Product key={index} figure={figure} />
          ))}
        </div>
      ))}

      <div className="button-container">
        {isLoadingMore ? <Loader /> :
        <button className="loadMoreButton" onClick={loadMore}>
          <span>Cargar más</span>
        </button>}
      </div>
      <Footer />
    </div>
  );
}

export default AnimePage;