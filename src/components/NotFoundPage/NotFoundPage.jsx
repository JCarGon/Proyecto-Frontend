import React from "react";
import Header from '../Header/Header';
import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import imgKO from '../../images/pikachuKO.webp';
import './NotFoundPage.css';

function NotFoundPage() {
  return (
    <div>
      <Header />
      <Nav />
      <div className="ko-container">
        <p>Vaya, parece que no hemos encontrado lo que buscabas...</p>
        <img className="imgKO" src={imgKO} alt="imagen de Pikachu abatido para indicar que no se ha eencontrado la página"></img>
      </div>
      <Footer />
    </div>
  );
}

export default NotFoundPage;