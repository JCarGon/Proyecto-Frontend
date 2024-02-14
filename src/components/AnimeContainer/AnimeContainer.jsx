import React from 'react';
import { Link } from 'react-router-dom';
import './AnimeContainer.css';
import logoDBZ from '../../resources/logoDBZ.png';
import LogoMHA from '../../resources/LogoMHA.png';
import LogoAOT from '../../resources/LogoAOT.png';
import LogoOnePiece from '../../resources/LogoOnePiece.png';
import LogoNaruto from '../../resources/LogoNaruto.png';
import LogoKNY from '../../resources/LogoKNY.png';

function AnimeContainer() {
  return (
    <div className="image-grid">
      <div className='images-group'>
        <Link to="/products/DragonBallZ"><img src={logoDBZ} alt="Logo de Dragon Ball Z" className='logoDBZ' /></Link>
        <Link to="/products/AttackOnTitan"><img src={LogoAOT} alt="Imagen 1" className='LogoAOT' /></Link>
      </div>
      <div className='images-group'>
        <Link to="/products/KimetsuNoYaiba"><img src={LogoKNY} alt="Imagen 1" className='LogoKNY' /></Link>
        <Link to="/products/MyHeroAacademia"><img src={LogoMHA} alt="Imagen 1" className='LogoMHA' /></Link>
      </div>
      <div className='images-group'>
        <Link to="/products/Naruto"><img src={LogoNaruto} alt="Imagen 1" className='LogoNaruto' /></Link>
        <Link to="/products/OnePiece"><img src={LogoOnePiece} alt="Imagen 1" className='LogoOnePiece' /></Link>
      </div>
    </div>
  );
}

export default AnimeContainer;
