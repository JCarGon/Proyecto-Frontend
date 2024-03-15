import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import Nav from "../Nav/Nav";
import Footer from "../Footer/Footer";
import "./UserPage.css";

function UserPage() {
  const [userData, setUserData] = useState(null);
  const [userDataPurchases, setUserDataPurchases] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const baseUrl = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    fetchUserData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await fetch(`${baseUrl}/v1/users/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        const text = await response.text();
        const data = text ? JSON.parse(text) : {};
        setUserData(data);
        fetchUserPurchases();
      } else if (response.status === 401) {
        alert("Sesión expirada. Inicie sesión de nuevo.");
        clearUserData();
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const fetchUserPurchases = async () => {
    try {
      const response = await fetch(`${baseUrl}/v1/users/me/purchases`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        const purchases = await response.json();
        setUserDataPurchases(purchases);
      } else if (response.status === 401) {
        alert("Sesión expirada. Inicie sesión de nuevo.");
        clearUserData();
      }
    } catch (error) {
      console.error("Error fetching user purchases:", error);
    }
  };

  const deleteUserAccount = async () => {
    const confirmation = window.confirm("¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer.");
    if (confirmation) {
      try {
        const response = await fetch(`${baseUrl}/v1/users/me`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          alert("Usuario eliminado correctamente.");
          clearUserData();
        } else if (response.status === 401) {
          alert("Sesión expirada. Inicie sesión de nuevo.");
          clearUserData();
        }
      } catch (error) {
        console.error("Error deleting user account:", error);
      }
    }
  };

  const clearUserData = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('userCart');
    navigate("/");
  };

  return (
    <div>
      <Header />
      <Nav />
      <div className="user-page-content">
        <h2>Información del usuario</h2>
        {userData && (
          <div className="user-info">
            <p>Email: <span>{userData.email}</span></p>
            <p>Username: <span>{userData.username}</span></p>
            <p>Nombre completo: <span>{userData.name}</span></p>
            <p>Dirección: <span>{userData.address}</span></p>
            <p>Código Postal: <span>{userData.cp}</span></p>
            <p>Ciudad: <span>{userData.city}</span></p>
            <p>Teléfono: <span>{userData.tlf}</span></p>
            <button onClick={deleteUserAccount} className="delete-user-btn">Eliminar este usuario</button>
          </div>
        )}
        <h2>Compras del usuario:</h2>
        {userDataPurchases.length > 0 && (
          <div className="purchases-info">
            {userDataPurchases.map(purchase => (
              <div key={purchase._id} className="purchase-info">
                <p>ID de la compra: <span>{purchase._id}</span></p>
                <p>Opción de envío: <span>{purchase.shippingAddress}</span></p>
                <p>Productos:</p>
                {purchase.products.map(product => (
                  <span key={product._id}>-{product.figureName}; precio de compra: {product.price}€</span>
                ))}
                <p>Precio total de la compra: <span>{purchase.totalPrice}€</span></p>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default UserPage;
