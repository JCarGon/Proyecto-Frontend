import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import LoginModal from '../Login/LoginModal';
import './UserPage.css';

function UserPage() {
    const [userData, setUserData] = useState(null);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [isUserInfoOpen, setIsUserInfoOpen] = useState(false);
    const [isUserEditOpen, setIsUserEditOpen] = useState(false);
    const { register, handleSubmit, formState: { errors, isValid } } = useForm({
        mode: "onChange"
    });
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!token) {
            setShowLoginModal(true);
        } else {
            fetchUserData();
        }
    }, []);

    const fetchUserData = async () => {
        try {
            const response = await fetch('http://localhost:7000/v1/users/me', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.status === 200) {
                const data = await response.json();
                setUserData(data);
            } else if (response.status === 401) {
                setShowLoginModal(true);
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const onUpdateSubmit = async (data) => {
        const updatedFields = Object.keys(data).reduce((acc, key) => {
            if (data[key]) acc[key] = data[key];
            return acc;
        }, {});

        try {
            const response = await fetch('http://localhost:7000/v1/users/me', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(updatedFields),
            });
            if (response.ok) {
                alert('Perfil modificado');
                window.location.reload();
            } else {
                const errorData = await response.json();
                alert(errorData.message || 'Error en la comunicación con el servidor');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    if (showLoginModal) {
        return <LoginModal onClose={() => setShowLoginModal(false)} />;
    }

    return (
        <div className="user-page">
            <div className="user-info" onClick={() => setIsUserInfoOpen(!isUserInfoOpen)}>
                <h2>Datos del usuario</h2>
                {isUserInfoOpen && userData && (
                    <div>
                        
                    </div>
                )}
            </div>
            <div className="user-edit" onClick={() => setIsUserEditOpen(!isUserEditOpen)}>
                <h2>Modificar datos del usuario</h2>
                {isUserEditOpen && (
                    <form onSubmit={handleSubmit(onUpdateSubmit)}>
                        
                    </form>
                )}
            </div>
        </div>
    );
}

export default UserPage;
