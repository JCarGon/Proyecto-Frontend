import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../Header/Header';
import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import ViewProduct from '../ViewProduct/ViewProduct';

function ProductPage() {
  let {id } = useParams();
  return (
    <div>
      <Header />
      <Nav />
      <ViewProduct figureId={id}/>
      <Footer />
    </div>
  );
}

export default ProductPage;