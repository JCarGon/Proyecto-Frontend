import React from "react";
import { Link } from 'react-router-dom';
import logoDBZ from '../../resources/logoDBZ.png';
import LogoMHA from '../../resources/LogoMHA.png';
import LogoAOT from '../../resources/LogoAOT.png';
import LogoOnePiece from '../../resources/LogoOnePiece.png';
import LogoNaruto from '../../resources/LogoNaruto.png';
import LogoKNY from '../../resources/LogoKNY.png';
import "./Nav.css";

function Nav() {
  return (
    <div className="nav-container">
      <div className="nav-links">
        <div className="nav-link">
          <Link to="/">INICIO</Link>
        </div>
        <div className="nav-link">
          <Link to="/products">PRODUCTOS</Link>
          <ul>
            <li><Link to="/products/DragonBallZ"><img src={logoDBZ} className="dbz-title" alt="logo de anime Dragon Ball Z"/></Link></li>
            <li><Link to="/products/MyHeroAcademia"><img src={LogoMHA} className="mha-title" alt="logo de anime My Hero Acadeemia"/></Link></li>
            <li><Link to="/products/AttackOnTitan"><img src={LogoAOT} className="aot-title" alt="logo de anime Attack On Titan"/></Link></li>
            <li><Link to="/products/OnePiece"><img src={LogoOnePiece} className="op-title" alt="logo de anime One Piece"/></Link></li>
            <li><Link to="/products/Naruto"><img src={LogoNaruto} className="n-title" alt="logo de anime Naruto"/></Link></li>
            <li><Link to="/products/KimersuNoYaiba"><img src={LogoKNY} className="kny-title" alt="logo de anime Kimetsu No Yaiba"/></Link></li>
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
