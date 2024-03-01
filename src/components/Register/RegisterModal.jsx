import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import './Register.css';

function RegisterModal({ onClose }) {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isValid } } = useForm({
    mode: "onChange"
  });

  const onSubmit = async data => {
    try {
      const response = await fetch('http://localhost:7000/v1/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (response.ok) {
        alert('Usuario creado correctamente');
        onClose();
        navigate('/');
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Error en la comunicación con el servidor');
      }
    } catch (error) {
      console.error('Error en la petición:', error);
      alert('Error en la comunicación con el servidor');
    }
  };

  return (
    <div className="register-modal">
      <div className="register-form-container">
        <button className="close-button" onClick={onClose}>X</button>
        <h2>Regístrate</h2>
        <form className='registerForm' onSubmit={handleSubmit(onSubmit)}>
          <input
            placeholder="Email"
            {...register('email', {
              required: 'El email es requerido',
              pattern: {
                value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i,
                message: 'Formato de email inválido'
              }
            })}
          />
          {errors.email && <p>{errors.email.message}</p>}

          <input
            type="password"
            placeholder="Contraseña"
            {...register('password', {
              required: 'La contraseña es requerida',
              maxLength: {
                value: 30,
                message: 'La contraseña no puede tener más de 30 caracteres'
              },
              pattern: {
                value: /^[A-Za-z0-9]+$/i,
                message: 'La contraseña solo puede contener caracteres alfanuméricos'
              }
            })}
          />
          {errors.password && <p>{errors.password.message}</p>}

          <input
            placeholder="Nombre de usuario"
            {...register('username', {
              required: 'El nombre de usuario es requerido',
              maxLength: {
                value: 30,
                message: 'El nombre de usuario no puede tener más de 30 caracteres'
              },
              pattern: {
                value: /^[A-Za-z0-9]+$/i,
                message: 'El nombre de usuario solo puede contener caracteres alfanuméricos'
              }
            })}
          />
          {errors.username && <p>{errors.username.message}</p>}

          <input
            placeholder="Nombre completo"
            {...register('name', { required: 'El nombre es requerido' })}
          />
          {errors.name && <p>{errors.name.message}</p>}

          <input
            placeholder="Dirección"
            {...register('address', { required: 'La dirección es requerida' })}
          />
          {errors.address && <p>{errors.address.message}</p>}

          <input
            placeholder="Código Postal"
            {...register('cp', { required: 'El código postal es requerido' })}
          />
          {errors.cp && <p>{errors.cp.message}</p>}

          <input
            placeholder="Ciudad"
            {...register('city', { required: 'La ciudad es requerida' })}
          />
          {errors.city && <p>{errors.city.message}</p>}

          <input
            placeholder="Teléfono"
            {...register('tlf', { required: 'El teléfono es requerido' })}
          />
          {errors.tlf && <p>{errors.tlf.message}</p>}

          <button 
            className={`buttonRegister ${isValid ? 'enabled' : ''}`} 
            type="submit" 
            disabled={!isValid}>
            Registrarse
          </button>
        </form>
      </div>
      <div className="register-image-container"></div>
    </div>
  );
}

export default RegisterModal;
