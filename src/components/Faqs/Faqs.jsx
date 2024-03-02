import React from 'react';
import Header from '../Header/Header';
import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import './Faqs.css';

function Faqs() {
  return (
    <div>
      <Header />
      <Nav />
      <div className="faqs-container">
        <h1>FAQS</h1>
        <details>
          <summary>¿Por qué no puedo seleccionar más de 1 en la cantidad de la misma figura?</summary>
          <p>La cantidad de figuras está limitada a 1 por usuario en el mismo pedido para que, 
            de esta manera, haya más posibilidadesde que pueda ser adquirida por más usuarios 
            dado que el stock que tenemos es el correspondiente a una nueva apertura.</p>
        </details>
        <details>
          <summary>¿Cuánto tardan en llegar las figuras?</summary>
          <p>Depende de si hay stock en tienda, está en camino a la tienda o está encargada. 
            En el primer caso, se puede recoger en tienda en el momento de la compra o se envía al
            domicilio indicado tan pronto como sea posible; en el segundo caso, se podrá recoger o
            se enviiará al domiclio indicado tan pronto como recibamos el pedido en la tienda y
            pueda ser preparado; en el tercer caso, dependerá del tiempo que tarde en llegar la
            figura a la tienda.</p>
        </details>
        <details>
          <summary>¿Qué métodos de pago están disponibles?</summary>
          <p>Si se paga a través de la web, el pago se podrá realizar mediante tarjeta o paypal.
            Si se paga en tienda, solo se podrá realizar el pago mediante tarjeta.</p>
        </details>
        <details>
          <summary>¿Cómo puedo contactar con la tienda para resolver una duda sobre el pedido?</summary>
          <p>Para contactar con la tienda puedes llamar por teléfono al número indicado en la
            página web, escribir un correo electrónico indicando el motivo de tu consulta, o
            accediendo a la sección "Contacto" de nuestra web y rellenando el formulario para
            ponernos en contacto contigo tan pronto como sea posible. También puedes acercarte
            personalmente a la tienda.</p>
        </details>
      </div>
      <Footer />
    </div>
  );
}

export default Faqs;
