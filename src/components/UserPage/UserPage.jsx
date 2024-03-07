import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import Nav from "../Nav/Nav";
import Footer from "../Footer/Footer";
import "./UserPage.css";

function UserPage() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchUserData();
  });

  const fetchUserData = async () => {
    try {
      const response = await fetch("http://localhost:7000/v1/users/me", {
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
      } else if (response.status === 401) {
        clearUserData();
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const deleteUserAccount = async () => {
    const confirmation = window.confirm("¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer.");
    if (confirmation) {
      try {
        const response = await fetch("http://localhost:7000/v1/users/me", {
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
          clearUserData();
        }
      } catch (error) {
        console.error("Error deleting user account:", error);
      }
    }
  };

  const clearUserData = () => {
    navigate("/");
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('userCart');
  };

  return (
    <div>
      <Header />
      <Nav />
      <div className="user-page-content">
        {userData && (
          <div className="user-info">
            <h2>Información del usuario</h2>
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
      </div>
      <Footer />
    </div>
  );
}

export default UserPage;
