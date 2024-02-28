import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import Product from '../Product/Product';
import LoginModal from '../Login/LoginModal';
import './Cart.css';

function Cart() {
  const [userFigures, setUserFigures] = useState([]);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
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
        window.location.reload();
      } else if (response.status === 401) {
        setIsLoginModalOpen(true);
      }
    } catch (error) {
      console.error("Error al eliminar la figura:", error);
    }
  };

  const confirmOrder = async () => {
    const totalPrice = userFigures.reduce((acc, figure) => acc + figure.price, 0);
    const confirm = window.confirm(`¿Está seguro que desea realizar un pedido por un total de ${totalPrice} €?`);
    if (!confirm) {
      return;
    }

    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://localhost:7000/v1/users/confirmOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
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
      <h1>Carrito del usuario</h1>
      <div className="cart-content">
        {userFigures.map(figure => (
          <div key={figure._id} className="cart-item">
            <Product figure={figure} />
            <button onClick={() => handleRemoveFigure(figure._id)}>Eliminar del carrito</button>
          </div>
        ))}
        {userFigures.length > 0 && (
          <>
            <div>Precio total: {userFigures.reduce((acc, figure) => acc + figure.price, 0)} €</div>
            <button onClick={confirmOrder}>Confirmar pedido</button>
          </>
        )}
      </div>
      <Footer />
      {isLoginModalOpen && <LoginModal onClose={() => setIsLoginModalOpen(false)} />}
    </div>
  );
}

export default Cart;
