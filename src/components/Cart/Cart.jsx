import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import LoginModal from '../Login/LoginModal';
import AddressModal from '../AddressModal/AddressModal';
import trash from '../../images/trash.svg';
import './Cart.css';

function Cart() {
  const [userFigures, setUserFigures] = useState([]);
  const [userAddress, setUserAddress] = useState('');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setIsLoginModalOpen(true);
      return;
    }

    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:7000/v1/users/me', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setUserFigures(data.favouritesFigures || []);
          setUserAddress(data.address);
        } else if (response.status === 401) {
          setIsLoginModalOpen(true);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  const handleRemoveFigure = async (figureId) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:7000/v1/users/figures/${figureId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        alert("Figura eliminada del carrito");
        setUserFigures(userFigures.filter(figure => figure._id !== figureId));
      } else if (response.status === 401) {
        setIsLoginModalOpen(true);
      }
    } catch (error) {
      console.error("Error al eliminar la figura:", error);
    }
  };

  const confirmOrder = () => {
    setIsAddressModalOpen(true);
  };

  const handleAddressAccept = async () => {
    const totalPrice = userFigures.reduce((acc, figure) => acc + (figure.price * 0.9), 0);
    const confirm = window.confirm(`¿Está seguro que desea realizar un pedido por un total de ${totalPrice.toFixed(2)} €?`);
    if (!confirm) {
      setIsAddressModalOpen(false);
      return;
    }

    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://localhost:7000/v1/users/confirmOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      });

      if (response.ok) {
        navigate('/orderConfirmed');
      } else if (response.status === 401) {
        setIsLoginModalOpen(true);
      }
    } catch (error) {
      console.error("Error al confirmar el pedido:", error);
    }
  };

  return (
    <div>
      <Header />
      <Nav />
      <div className="cart-content">
        <h1>Carrito del usuario</h1>
        {userFigures.map(figure => (
          <div key={figure._id} className="cart-item">
            <img className="cart-figure-image" src={`/resources/figures/${figure.principalImage}`} alt={figure.name} />
            <div className="cart-figure-info">
              <h3 className="cart-figure-title">{figure.name}</h3>
              <p className="cart-figure-price">Precio: {(figure.price * 0.9).toFixed(2)}€ (Descuento aplicado)</p>
            </div>
            <img src={trash} className="delete-figure-cart" onClick={() => handleRemoveFigure(figure._id)} alt="Icono de basura para eliminar esta figura"></img>
          </div>
        ))}
        {userFigures.length > 0 && (
          <>
            <h3 className="total-price">Precio total: {(userFigures.reduce((acc, figure) => acc + (figure.price * 0.9), 0)).toFixed(2)} €</h3>
            <button className="confirm-purchase" onClick={confirmOrder}>
              <span>Confirmar pedido</span>
            </button>
          </>
        )}
      </div>
      <Footer />
      {isLoginModalOpen && <LoginModal onClose={() => setIsLoginModalOpen(false)} />}
      {isAddressModalOpen && <AddressModal user={{address: userAddress}} onCancel={() => setIsAddressModalOpen(false)} onAccept={handleAddressAccept} />}
    </div>
  );
}

export default Cart;
