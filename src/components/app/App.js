import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LadingPage from '../LandingPage/LandingPage';
import AnimesPage from '../AnimesPage/AnimesPage';
import ProductPage from '../ProductPage/ProductPage';
import NotFoundPage from '../NotFoundPage/NotFoundPage';


function App() {
  return (
    <Routes>
      <Route path='/' element={<LadingPage />} />
      <Route path='/figures' element={<AnimesPage />}/>
      <Route path='/figures/:anime' />
      <Route path='/figures/:anime/:id' element={<ProductPage />} />
      <Route path='/WAW' />
      <Route path='/contact' />
      <Route path='/faqs' />
      <Route path='/login' />
      <Route path='/register' />
      <Route path='/cart' />
      <Route path='*' element={<Navigate to="/not-found" />} />
      <Route path='/not-found' element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
