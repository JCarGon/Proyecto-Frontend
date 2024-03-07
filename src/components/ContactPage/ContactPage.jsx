import React, { useState } from "react";
import Header from "../Header/Header";
import Nav from "../Nav/Nav";
import Footer from "../Footer/Footer";
import "./ContactPage.css";

function ContactPage() {
  const [formData, setFormData] = useState({
    nombre: "",
    apellidos: "",
    email: "",
    telefono: "",
    consulta: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const canSubmit = () => {
    const { nombre, apellidos, email, telefono, consulta } = formData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{9}$/;
    return (
      nombre.match(/^[A-Za-záéíóúÁÉÍÓÚ\s]+$/) &&
      apellidos.match(/^[A-Za-záéíóúÁÉÍÓÚ\s]+$/) &&
      email.match(emailRegex) &&
      telefono.match(phoneRegex) &&
      consulta.trim() !== ""
    );
  };

  const handleReset = () => {
    setFormData({
      nombre: "",
      apellidos: "",
      email: "",
      telefono: "",
      consulta: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (canSubmit()) {
      alert("Formulario enviado. Nos pondremos en contacto tan pronto como podamos.");
      handleReset();
    } else {
      alert("Por favor, rellene todos los campos correctamente.");
    }
  };

  return (
    <div>
      <Header />
      <Nav />
      <div className="contact-content">
        <h1 className="contact-title">CONTACTO</h1>
        <div className="contact-form">
          <p className="contact-us-info">Si quiere que la tienda se ponga en contacto con usted, rellene todos los campos:</p>
          <form onSubmit={handleSubmit}>
            <div className="attrs-contact">
              <p>Nombre: </p>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
              />
              <span>*Solo caracteres alfabéticos</span>
            </div>
            <div className="attrs-contact">
              <p>Apellidos: </p>
              <input
                type="text"
                name="apellidos"
                value={formData.apellidos}
                onChange={handleChange}
              />
              <span>*Solo caracteres alfabéticos</span>
            </div>
            <div className="attrs-contact">
              <p>Email: </p>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <span>*Formato correcto correo@correo.com</span>
            </div>
            <div className="attrs-contact">
              <p>Número de teléfono: </p>
              <input
                type="text"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
              />
              <span>*Solo 9 dígitos numéricos</span>
            </div>
            <div>
              <p className="doubt">Indique su consulta o duda:</p>
              <textarea
              name="consulta"
              value={formData.consulta}
              onChange={handleChange}
            />
            </div>
            <div className="contact-buttons">
              <button type="button" onClick={handleReset}>Reiniciar</button>
              <button type="submit" disabled={!canSubmit()}>Enviar</button>
            </div>
          </form>
        </div>
        <div className="visit-us">
          <p>Si quiere visitarnos:</p>
          <p>Dirección: Centro Comercial Lagoh, Primera Planta, Av. de Palmas
            Altas, 1, 41012, Sevilla</p>
          <iframe
            title="map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3172.0040066565375!2d-5.989929023684683!3d37.34241383694728!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd126d1f558d7a6d%3A0xd57b578dea57e6ef!2sCentro%20Comercial%20Lagoh%20Sevilla!5e0!3m2!1ses!2ses!4v1709832900730!5m2!1ses!2ses"
            width="730"
            height="400"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ContactPage;
