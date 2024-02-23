import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LadingPage from '../LandingPage/LandingPage';
import AnimesPage from '../AnimesPage/AnimesPage';
import AnimePage from '../AnimePage/AnimePage';
import ProductPage from '../ProductPage/ProductPage';
import NotFoundPage from '../NotFoundPage/NotFoundPage';


function App() {
  return (
    <Routes>
      <Route path='/' element={<LadingPage />} />
      <Route path='/animes' element={<AnimesPage />}/>
      <Route path="/animes/:animeName" element={<AnimePage />} />
      <Route path='/animes/:animeName/:id' element={<ProductPage />} />
      <Route path='/WAW' />
      <Route path='/contact' />
      <Route path='/faqs' />
      <Route path='/register' />
      <Route path='/cart' />
      <Route path='*' element={<Navigate to="/not-found" />} />
      <Route path='/not-found' element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
