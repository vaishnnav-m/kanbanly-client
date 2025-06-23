"use client"
import FeaturesSection from "../organisms/landing-page/Features";
import Footer from "../organisms/landing-page/Footer";
import HeroSection from "../organisms/landing-page/HeroSection";
import Navbar from "../organisms/landing-page/NavBar";
import PricingSection from "../organisms/landing-page/PricingSection";
import "@/app/landing.module.css";

const LandingPageTemplate = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <FeaturesSection />
        <PricingSection />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPageTemplate;
