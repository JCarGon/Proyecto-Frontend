import React from 'react';
import Header from '../Header/Header';
import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import logoEmpresa from '../../images/logo.webp';
import './QuienesSomos.css';

function QuienesSomos() {
  return (
    <div>
      <Header />
      <Nav />
      <div className="quienes-somos-container">
        <h1 className='waw-title'>QUIÉNES SOMOS</h1>
        <p className='waw-text'>FrikiLevel es una empresa que surge para aprovechar la oportunidad de dar a nuestros clientes
          la posibilidad de tener esa figura que tanto le gusta y no sabe cómo acceder a ella por tener
          que comprarla, en la mayoría de casos, en páginas internacionales, las cuales no les transmiten
          suficiente confianza.</p>
          
          <p className='waw-text'>Conocedores de esto, nuestros clientes también disponen de una tienda física en el CC Lagoh,
          Sevilla, para que puedan contactar con nosotros personalmente si así lo desean y ver de primera
          mano cómo son las figuras antes de encargarlas.</p>
          
          <p className='waw-text'>Creemos que entrar en este mercado es una buena oportunidad para satisfacer el creciente
          deseo de las personas coleccionistas o que, simplemente, quieren tener una figura de su anime
          favorito.</p>
          
          <p className='waw-text'>PD: este diseño y futura aplicación web está hecha por una persona, como proyecto de final de
          FP de Desarrollo de Aplicaciones Web. NO es una tienda real.</p>
        <img src={logoEmpresa} alt="Imagen del logo de la empresa" />
      </div>
      <Footer />
    </div>
  );
}

export default QuienesSomos;
