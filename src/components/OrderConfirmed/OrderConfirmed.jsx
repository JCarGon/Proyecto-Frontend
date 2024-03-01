import React from "react";
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import imgOK from '../../images/gokuOK.webp';
import './OrderConfirmed.css';

function OrderConfirmed() {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate('/');
  };

  return (
    <div>
      <Header />
      <Nav />
      <div className="ok-container">
        <p>Su pedido ha sido recibido, ¡lo procesaremos lo más rápido que podamos!</p>
        <img className="imgOK" src={imgOK} alt="imagen de Goku con pulgar hacia arriba para indicar que está OK"></img>
      </div>
      <button className="home-button" onClick={goToHome}>Ir a Inicio</button>
      <Footer />
    </div>
  );
}

export default OrderConfirmed;
