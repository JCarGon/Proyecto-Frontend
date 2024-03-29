import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LadingPage from '../LandingPage/LandingPage';
import SearchPage from '../SearchPage/SearchPage';
import AnimesPage from '../AnimesPage/AnimesPage';
import AnimePage from '../AnimePage/AnimePage';
import QuienesSomos from '../QuienesSomos/QuienesSomos';
import Faqs from '../Faqs/Faqs';
import ContactPage from '../ContactPage/ContactPage';
import Cart from '../Cart/Cart';
import OrderConfirmed from '../OrderConfirmed/OrderConfirmed';
import ProductPage from '../ProductPage/ProductPage';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import UserPage from '../UserPage/UserPage';

function App() {
  return (
    <Routes>
      <Route path='/' element={<LadingPage />} />
      <Route path='/userPage' element={<UserPage />} />
      <Route path='/search/character/:name' element={<SearchPage />} />
      <Route path='/animes' element={<AnimesPage />}/>
      <Route path="/animes/:animeName" element={<AnimePage />} />
      <Route path='/animes/:animeName/:id' element={<ProductPage />} />
      <Route path='/WAW' element={<QuienesSomos />} />
      <Route path='/contact' element={<ContactPage />} />
      <Route path='/faqs' element={<Faqs />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/orderConfirmed' element={<OrderConfirmed />} />
      <Route path='*' element={<Navigate to="/not-found" />} />
      <Route path='/not-found' element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
