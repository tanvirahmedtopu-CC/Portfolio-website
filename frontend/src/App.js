import React from "react";
import "./App.css";

// Components
import Navigation from "./components/Navigation";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import PortfolioSection from "./components/PortfolioSection";
import ServicesSection from "./components/ServicesSection";
import SocialMediaSection from "./components/SocialMediaSection";
import SoftwareSection from "./components/SoftwareSection";
import AIToolsSection from "./components/AIToolsSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App bg-black min-h-screen">
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <PortfolioSection />
        <ServicesSection />
        <SocialMediaSection />
        <SoftwareSection />
        <AIToolsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
