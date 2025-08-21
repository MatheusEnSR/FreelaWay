import React from "react";
import Navbar from "../../Components/NavBar/navbar.jsx"; 
import Footer from "../../Components/Footer/footer.jsx"; 
import './home.css'

function Home() {
  return (
    <main>
      <Navbar />
      <h2>Bem-vindo à Home</h2>
      <Footer />
    </main>
    
  );
}

export default Home;
