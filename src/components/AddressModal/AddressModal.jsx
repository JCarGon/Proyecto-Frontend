import React, { useState } from 'react';
import './AddressModal.css';

function AddressModal({ user, onCancel, onAccept }) {
  const [newAddress, setNewAddress] = useState('');
  const [selectedOption, setSelectedOption] = useState('store');

  const handleSubmit = (e) => {
    e.preventDefault();
    let addressToSend;
    switch(selectedOption) {
      case 'store':
        addressToSend = 'Recoger en tienda (C.C. Lagoh)';
        break;
      case 'home':
        addressToSend = user.address;
        break;
      case 'new':
        addressToSend = newAddress;
        break;
      default:
        addressToSend = 'Dirección no especificada'
    }
    onAccept(addressToSend);
  };

  return (
    <div className="address-modal-overlay">
      <div className="address-modal-content">
        <h2>Selecciona una opción para el envío del producto:</h2>
        <form className='address-form' onSubmit={handleSubmit}>
          <div>
            <input 
              type="radio" 
              id="store" 
              name="deliveryOption" 
              value="store" 
              checked={selectedOption === 'store'}
              onChange={() => setSelectedOption('store')} 
            />
            <label htmlFor="store">Recoger en tienda (C.C. Lagoh)</label>
          </div>
          <div>
            <input 
              type="radio" 
              id="home" 
              name="deliveryOption" 
              value="home" 
              checked={selectedOption === 'home'}
              onChange={() => setSelectedOption('home')} 
            />
            <label htmlFor="home">Envío al domicilio: {user.address}</label>
          </div>
          <div>
            <input 
              type="radio" 
              id="new" 
              name="deliveryOption" 
              value="new" 
              checked={selectedOption === 'new'}
              onChange={() => setSelectedOption('new')} 
            />
            <label htmlFor="new">Introducir otra dirección:</label>
            <input type="text" className='address-input' value={newAddress} onChange={(e) => setNewAddress(e.target.value)} />
          </div>
          <div className='divs-modal-buttons'>
            <button type="button" className='cancel-button' onClick={onCancel}>Cancelar</button>
            <button type="submit" className='submit-button'>Aceptar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddressModal;
