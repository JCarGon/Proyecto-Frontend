import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../Header/Header';
import Nav from '../Nav/Nav';
import ShowSearch from "../ShowSearch/ShowSearch";
import Footer from '../Footer/Footer';

function SearchPage() {
  const { name } = useParams();
  
  return (
    <div>
      <Header />
      <Nav />
      <ShowSearch name={name} />
      <Footer />
    </div>
  );
}

export default SearchPage;