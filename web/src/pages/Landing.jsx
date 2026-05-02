import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CalendarDays, Shield, Clock, ArrowRight } from "lucide-react";
// Path points to your 'styles' folder
import "../styles/Landing.css"; 
import { Button } from "../components/button"; 
import landingImg from "../assets/landing_premium.png";

const Landing = () => {
  const features = [
    { icon: CalendarDays, title: "Easy Booking", desc: "Book your dental appointments online in just a few clicks, 24/7." },
    { icon: Shield, title: "Secure Platform", desc: "Your data is protected with enterprise-grade security measures." },
    { icon: Clock, title: "Real-Time Updates", desc: "Get instant confirmation and status updates on your appointments." },
  ];

  return (
    <div className="landing-wrapper">
      <nav className="navbar">
        <div className="container nav-content">
          <div className="logo-section">
            <div className="logo-icon">R</div>
            <span className="logo-text text-gradient">RootUser</span>
          </div>
          <div className="nav-actions">
            <Link to="/login">
              <Button size="sm" className="btn-gradient">Sign In</Button>
            </Link>
            <Link to="/register">
              <Button size="sm" className="btn-gradient">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      <header className="hero-section">
        <div className="container hero-content">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="hero-text-area"
          >
            <div className="badge">Now accepting online bookings</div>
            <h1 className="text-gradient">Your Smile Deserves The Best Care</h1>
            <p>Book dental appointments effortlessly with RootUser. Real-time scheduling, instant confirmations, and a seamless patient experience.</p>
            <Link to="/login">
              <Button size="lg" className="gradient-hero hero-btn">
                Book Your Appointment <ArrowRight size={18} />
              </Button>
            </Link>
          </motion.div>

          <div className="hero-image-wrapper">
            <img src={landingImg} alt="Modern Dental Clinic" />
          </div>
        </div>
      </header>

      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <h2>Why Choose RootUser?</h2>
            <p>Modern dental scheduling built for patients and clinics.</p>
          </div>
          <div className="features-grid">
            {features.map((f, i) => (
              <div key={i} className="feature-card">
                <div className="feature-icon"><f.icon size={24} /></div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>© 2026 RootUser. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Landing;