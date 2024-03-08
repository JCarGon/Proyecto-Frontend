import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import './Register.css';

function RegisterModal({ onClose }) {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isValid } } = useForm({
    mode: "onChange"
  });
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const onSubmit = async data => {
    try {
      const response = await fetch(`${baseUrl}/v1/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (response.ok) {
        alert('Usuario creado correctamente. Volviendo a la página de inicio.');
        onClose();
        navigate('/');
      } else {
        alert('Error en la creación del usuario. Inténtelo de nuevo más tarde.');
      }
    } catch (error) {
      console.error('Error en la petición:', error);
      alert('Error en la creación del usuario. Inténtelo de nuevo más tarde.');
    }
  };

  return (
    <div className="register-modal">
      <div className="register-form-container">
        <button className="close-button" onClick={onClose}>X</button>
        <h2>Regístrate</h2>
        <form className='registerForm' onSubmit={handleSubmit(onSubmit)}>
          <div className='input-wrapper'>
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
            {errors.email && <p className='error-message'>{errors.email.message}</p>}
          </div>

          <div className='input-wrapper'>
            <input
              type="password"
              placeholder="Contraseña"
              {...register('password', {
                required: 'La contraseña es requerida',
                minLength: {
                  value: 6,
                  message: 'La contraseña debe contener al menos 6 caracteres'
                },
                maxLength: {
                  value: 20,
                  message: 'La contraseña no puede tener más de 20 caracteres'
                },
                pattern: {
                  value: /^[A-Za-z0-9]+$/i,
                  message: 'La contraseña solo puede contener caracteres alfanuméricos'
                }
              })}
            />
            {errors.password && <p className='error-message'>{errors.password.message}</p>}
          </div>

          <div className='input-wrapper'>
            <input
              placeholder="Nombre de usuario"
              {...register('username', {
                required: 'El nombre de usuario es requerido',
                minLength: {
                  value: 5,
                  message: 'El nombre de usuario debe contener al menos 5 caracteres'
                },
                maxLength: {
                  value: 20,
                  message: 'El nombre de usuario no puede tener más de 20 caracteres'
                },
                pattern: {
                  value: /^[A-Za-z0-9]+$/i,
                  message: 'El nombre de usuario solo puede contener caracteres alfanuméricos'
                }
              })}
            />
            {errors.username && <p className='error-message'>{errors.username.message}</p>}
          </div>

          <div className='input-wrapper'>
            <input
              placeholder="Nombre completo"
              {...register('name', {
                required: 'El nombre es requerido',
                minLength: {
                  value: 6,
                  message: 'El nombre debe contener al menos 6 caracteres'
                },
                maxLength: {
                  value: 20,
                  message: 'El nombre no puede tener más de 20 caracteres'
                },
                pattern: {
                  value: /^[A-Za-z\sáéíóúÁÉÍÓÚ]+$/,
                  message: 'El nombre solo puede contener caracteres alfabéticos'
                }
              })}
            />
            {errors.name && <p className='error-message'>{errors.name.message}</p>}
          </div>

          <div className='input-wrapper'>
            <input
              placeholder="Dirección"
              {...register('address', {
                required: 'La dirección es requerida',
                pattern: {
                  value: /^c\/\s[áéíóúÁÉÍÓÚA-Za-z\s]+,\s\d+$/,
                  message: 'La dirección debe seguir el formato "c/ ..., número"'
                }
              })}
            />
            {errors.address && <p className='error-message'>{errors.address.message}</p>}
          </div>

          <div className='input-wrapper'>
            <input
              placeholder="Código Postal"
              {...register('cp', {
                required: 'El código postal es requerido',
                minLength: {
                  value: 5,
                  message: 'El código postal solo debe contener 5 números "XXXXX"'
                },
                maxLength: {
                  value: 5,
                  message: 'El código postal solo debe contener 5 números "XXXXX"'
                },
                pattern: {
                  value: /^\d+$/,
                  message: 'El código postal solo debe contener números'
                }
              })}
            />
            {errors.cp && <p className='error-message'>{errors.cp.message}</p>}
          </div>

          <div className='input-wrapper'>
            <input
              placeholder="Ciudad"
              {...register('city', {
                required: 'La ciudad es requerida',
                minLength: {
                  value: 4,
                  message: 'La ciudad debe contener más de 4 caracteres'
                },
                maxLength: {
                  value: 20,
                  message: 'La ciudad debe contener menos de 20 caracteres'
                },
                pattern: {
                  value: /^[A-Za-z\sáéíóúÁÉÍÓÚ]+$/,
                  message: 'La ciudad solo puede contener caracteres alfabéticos'
                }
              })}
            />
            {errors.city && <p className='error-message'>{errors.city.message}</p>}
          </div>

          <div className='input-wrapper'>
            <input
              placeholder="Teléfono"
              {...register('tlf', {
                required: 'El teléfono es requerido',
                minLength: {
                  value: 9,
                  message: 'El número de teléfono debe contener 9 dígitos'
                },
                maxLength: {
                  value: 9,
                  message: 'El número de teléfono debe contener 9 dígitos'
                },
                pattern: {
                  value: /^\d+$/,
                  message: 'El teléfono solo debe contener números'
                }
              })}
            />
            {errors.tlf && <p className='error-message'>{errors.tlf.message}</p>}
          </div>

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
