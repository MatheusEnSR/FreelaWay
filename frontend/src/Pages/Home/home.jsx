import React from "react";
import Navbar from "../../Components/NavBar/navbar.jsx"; 
import Footer from "../../Components/Footer/footer.jsx"; 
import Card from "../../Components/Card/card.jsx"; 
import FiltroCard from "../../Components/Filtro/filtrocard.jsx";

import './home.css'

function Home() {
  return (
    <main>
      <Navbar />
      
      <div className="home-content">
        <aside className="sidebar-left">
          <FiltroCard />
        </aside>
        
        <section className="main-content">
          <div className="card-wrapper">
            <Card />
          </div>
        </section>
      </div>
      
      <Footer />
    </main>
  );
}

export default Home;
