import React from "react";
import Header from '../Header/Header';
import Nav from '../Nav/Nav';
import PrincipalContainer from '../PrincipalContainer/PrincipalContainer';
import Footer from '../Footer/Footer';
import './LadingPage.css';

function LadingPage() {
  return (
    <div>
      <Header />
      <Nav />
      <PrincipalContainer />
      <Footer />
    </div>
  );
}

export default LadingPage;