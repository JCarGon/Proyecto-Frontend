import React, { useState, useEffect } from "react";
import LoginModal from '../Login/LoginModal';
import RegisterModal from "../Register/RegisterModal";
import Loader from "../Loader/Loader";
import './ViewProduct.css';

function ViewProduct({ figureId }) {
  const [figureData, setFigureData] = useState(null);
  const [currentImage, setCurrentImage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const [allImages, setAllImages] = useState([]);
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const discount = 0.8;

  const handleOpenModal = () => {
    const currentIndex = allImages.indexOf(currentImage);
    setImageIndex(currentIndex);
    setIsModalOpen(true);
  };

  const handleNextImage = () => {
    setImageIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      return nextIndex % allImages.length;
    });
  };

  const handlePrevImage = () => {
    setImageIndex((prevIndex) => {
      const nextIndex = prevIndex - 1;
      return nextIndex < 0 ? allImages.length - 1 : nextIndex;
    });
  };

  const handleCloseModal = () => setIsModalOpen(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${baseUrl}/v1/figures/${figureId}`);
        const data = await response.json();
        setFigureData(data);
        setCurrentImage(data.principalImage);
        setAllImages([data.principalImage, ...data.images]);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching figure data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [baseUrl, figureId]);

  const handleImageClick = (img) => {
    setCurrentImage(img);
  };

  const handleRegisterClick = () => {
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(true);
  };

  const handleRegisterModalClose = () => {
    setIsRegisterModalOpen(false);
  };

  const addToCart = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setIsLoginModalOpen(true);
      return;
    }

    try {
      const response = await fetch(`${baseUrl}/v1/cart/${figureId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        const currentCart = localStorage.getItem('userCart');
        const cartItems = currentCart ? JSON.parse(currentCart) : [];
        if (!cartItems.includes(figureId)) {
          cartItems.push(figureId);
          localStorage.setItem('userCart', JSON.stringify(cartItems));
        }
        alert("Figura añadida al carrito");
        window.location.reload();
      } else if (response.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('userCart');
        alert("Sesión expirada. Inicie sesión de nuevo.");
        setIsLoginModalOpen(true);
      } else if (response.status === 409) {
        alert("Ya tienes esta figura en el carrito, solo puedes añadirla una vez");
      }
    } catch (error) {
      console.error("Error: ", error);
      alert("Ha habido un error al añadir la figura al carrito. Inténtelo de nuevo más tarde.")
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  const { name, character, company, price, dimensions, material, brand, amount } = figureData;

  return (
    <div>
      <div className="view-container">
        <div className="images-carrousel">
          <img className="view-image" src={`/resources/figures/${currentImage}`} alt={name} onClick={handleOpenModal} />
          <div className="image-thumbnails">
            {[figureData.principalImage, ...figureData.images].map((img, index) => (
              <img
                key={index}
                src={`/resources/figures/${img}`}
                alt={`Thumbnail ${index}`}
                onClick={() => handleImageClick(img)}
                className={currentImage === img ? 'active-thumbnail' : ''}
              />
            ))}
          </div>
        </div>
        <div className="product-principal-info">
          <p className="view-title">{name}</p>
          <p className="view-amount">
            {amount > 0 ? `Stock actual: ${amount}` : 'No tenemos stock actualmente'}
          </p>
          <div className="prices-info">
            <span className="original-price">{price}€</span>
            <span className="new-price">{(price*discount).toFixed(2)}€</span>
          </div>
          <button 
            className={`addToCart ${amount <= 0 ? 'disabled' : ''}`} 
            onClick={addToCart}
            disabled={amount <= 0}
          >
            <span>Añadir al carrito</span>
          </button>
        </div>
        {isModalOpen && (
          <div className="modal">
            <span className="close-modal-btn" onClick={handleCloseModal}>X</span>
            <button className="prev-button" onClick={handlePrevImage}>&lt;</button>
            <img 
              src={`/resources/figures/${allImages[imageIndex]}`} 
              alt="Imagen ampliada" 
              className="modal-image" 
            />
            <button className="next-button" onClick={handleNextImage}>&gt;</button>
          </div>
        )}
        {isLoginModalOpen && (
          <LoginModal 
            onClose={() => setIsLoginModalOpen(false)} 
            onRegisterClick={handleRegisterClick}
          />
        )}
        {isRegisterModalOpen && (
          <RegisterModal onClose={handleRegisterModalClose} />
        )}
      </div>
      <div className="product-details">
        <h2>MÁS DETALLES:</h2>
        <p className="view-character">Figura de {character}, personaje del manga y anime {company}</p>
        <p className="view-brand">Marca: {brand}</p>
        <p className="view-company">Franquicia: {company}</p>
        <p className="view-character-name">Nombre de personaje: {character}</p>
        <p className="view-material">Materiales: {material}</p>
        <p className="view-dimensions">Dimensiones aproximadas: {dimensions}</p>
      </div>
    </div>
  );
}

export default ViewProduct;
