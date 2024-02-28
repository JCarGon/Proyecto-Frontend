import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function LoginModal({ onClose, onRegisterClick  }) {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async data => {
    const body = {
      email: data.email,
      password: data.password
    };
  
    try {
      const response = await fetch('http://localhost:7000/v1/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
  
      if (response.ok) {
        const responseData = await response.json();
        localStorage.setItem('token', responseData.token);
        onClose();
        navigate('/');
      } else {
        alert('Usuario y/o contraseña incorrecta');
      }
    } catch (error) {
      console.error('Error en la petición:', error);
    }
  };

  return (
    <div className="login-modal">
      <div className="login-form-container">
        <button className="close-button" onClick={onClose}>X</button>
        <h2>Inicia sesión</h2>
        <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
          <input
            id="email"
            placeholder="Email"
            {...register('email', {
              required: "El email es requerido",
              pattern: {
                value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i,
                message: "Formato de email inválido"
              }
            })}
          />
          {errors.email && <p>{errors.email.message}</p>}

          <input
            id="password"
            type="password"
            placeholder="Contraseña"
            {...register('password', {
              required: "La contraseña es requerida",
              pattern: {
                value: /^[A-Za-z0-9]+$/i,
                message: "Solo se permiten caracteres alfanuméricos"
              }
            })}
          />
          {errors.password && <p>{errors.password.message}</p>}

          <button className="buttonLogin" type="submit">Aceptar</button>
        </form>
        <div className="separator"></div>
        <h2>Regístrate</h2>
        <div className="register-section">
          <button className="registerButton" onClick={onRegisterClick}>Registrarse</button>
        </div>
      </div>
      <div className="login-image-container"></div>
    </div>
  );
}

export default LoginModal;
