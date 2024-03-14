import React from 'react';
import { Link } from 'react-router-dom';
import './AnimeContainer.css';
import logoDBZ from '../../images/DragonBallZ.webp';
import LogoMHA from '../../images/MyHeroAcademia.webp';
import LogoAOT from '../../images/AttackOnTitan.webp';
import LogoOnePiece from '../../images/OnePiece.webp';
import LogoNaruto from '../../images/Naruto.webp';
import LogoKNY from '../../images/KimetsuNoYaiba.webp';

function AnimeContainer() {
  return (
    <div className="image-grid">
      <div className='images-group'>
        <Link to="/animes/DragonBallZ"><img src={logoDBZ} alt="Logo del anime Dragon Ball Z" className='logoDBZ' /></Link>
        <Link to="/animes/MyHeroAcademia"><img src={LogoMHA} alt="Logo del anime My Hero Academia" className='LogoMHA' /></Link>
      </div>
      <div className='images-group'>
        <Link to="/animes/AttackOnTitan"><img src={LogoAOT} alt="Logo del anime Attack On Titan" className='LogoAOT' /></Link>
        <Link to="/animes/OnePiece"><img src={LogoOnePiece} alt="Logo del anime One Piece" className='LogoOnePiece' /></Link>
      </div>
      <div className='images-group'>
        <Link to="/animes/Naruto"><img src={LogoNaruto} alt="Logo del anime Naruto" className='LogoNaruto' /></Link>
        <Link to="/animes/KimetsuNoYaiba"><img src={LogoKNY} alt="Logo del anime Kimetsu No Yaiba" className='LogoKNY' /></Link>
      </div>
    </div>
  );
}

export default AnimeContainer;
