import React from "react";
import { Link } from 'react-router-dom';
import logoDBZ from '../../images/logoDBZ.png';
import LogoMHA from '../../images/LogoMHA.png';
import LogoAOT from '../../images/LogoAOT.png';
import LogoOnePiece from '../../images/LogoOnePiece.png';
import LogoNaruto from '../../images/LogoNaruto.png';
import LogoKNY from '../../images/LogoKNY.png';
import "./Nav.css";

function Nav() {
  return (
    <div className="nav-container">
      <div className="nav-links">
        <div className="nav-link">
          <Link to="/">INICIO</Link>
        </div>
        <div className="nav-link">
          <Link to="/animes">PRODUCTOS</Link>
          <ul>
            <li><Link to="/animes/DragonBallZ"><img src={logoDBZ} className="dbz-title" alt="logo de anime Dragon Ball Z"/></Link></li>
            <li><Link to="/animes/MyHeroAcademia"><img src={LogoMHA} className="mha-title" alt="logo de anime My Hero Acadeemia"/></Link></li>
            <li><Link to="/animes/AttackOnTitan"><img src={LogoAOT} className="aot-title" alt="logo de anime Attack On Titan"/></Link></li>
            <li><Link to="/animes/OnePiece"><img src={LogoOnePiece} className="op-title" alt="logo de anime One Piece"/></Link></li>
            <li><Link to="/animes/Naruto"><img src={LogoNaruto} className="n-title" alt="logo de anime Naruto"/></Link></li>
            <li><Link to="/animes/KimetsuNoYaiba"><img src={LogoKNY} className="kny-title" alt="logo de anime Kimetsu No Yaiba"/></Link></li>
          </ul>
        </div>
        <div className="nav-link">
          <Link to="/">QUIÉNES SOMOS</Link>
        </div>
        <div className="nav-link">
          <Link to="/">CONTACTO</Link>
        </div>
        <div className="nav-link">
          <Link to="/">FAQS</Link>
        </div>
      </div>
    </div>
  );
}

export default Nav;
