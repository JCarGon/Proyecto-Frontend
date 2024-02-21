import React, { useRef } from "react";
import './Footer.css';
import logoEmpresa from '../../images/logo.png';
import logoFacebook from '../../images/facebook.png';
import logoTwitter from '../../images/twitter.png';
import logoYoutube from '../../images/YouTube.png';
import logoInstagram from '../../images/instagram.png';

function Footer() {
  const footerLogoRef = useRef(null);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return(
    <div className="footer">
        <img className="footer-logo" src={logoEmpresa} alt="logoEmpresa" onClick={scrollToTop} ref={footerLogoRef}/>
        <div className="contact-info">
            <p>Teléfono: 954 65 42 55</p>
            <p>Correo: FrikiLevel@gmail.com</p>
        </div>
        <div className="social-icons">
            <a href="https://www.facebook.com/FrikiLevel" target="_blank" rel="noreferrer"><img src={logoFacebook} alt="Facebook"/></a>
            <a href="https://www.twitter.com/FrikiLevel" target="_blank" rel="noreferrer"><img src={logoTwitter} alt="Twitter"/></a>
            <a href="https://www.youtube.com/@FrikiLevel" target="_blank" rel="noreferrer"><img src={logoYoutube} alt="Youtube"/></a>
            <a href="https://www.instagram.com/FrikiLevel/" target="_blank" rel="noreferrer"><img src={logoInstagram} alt="Instagram"/></a>
        </div>
    </div>
  )
}

export default Footer;