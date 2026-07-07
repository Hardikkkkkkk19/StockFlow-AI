import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import TrustedCompanies from "../components/TrustedCompanies";
import Features from "../components/Features";
import DashboardPreview from "../components/DashboardPreview";
import AISection from "../components/AISection";
import Footer from "../components/Footer";

function Landing() {
  return (
    <>
      <Navbar />

      <section className="hero">
        <div className="container hero-container">

          <div className="hero-left">

            <span className="hero-tag">
              AI Powered Inventory Management
            </span>

            <h1>
              Manage Your Inventory
              <br />
              Smarter with
              <span> StockFlow AI</span>
            </h1>

            <p>
              Track inventory, manage products, visualize analytics,
              automate tasks and use AI to grow your business faster.
            </p>

            <div className="hero-buttons">

              <Link to="/dashboard" className="primary-btn">
  Get Started
</Link>

              <button className="secondary-btn">
                Watch Demo
              </button>

            </div>

          </div>

          <div className="hero-right">

            <div className="dashboard-card">

              <div className="dashboard-header">
                Inventory Overview
              </div>

              <div className="dashboard-item">
                <span>Total Products</span>
                <strong>1248</strong>
              </div>

              <div className="dashboard-item">
                <span>Low Stock</span>
                <strong>18</strong>
              </div>

              <div className="dashboard-item">
                <span>Categories</span>
                <strong>24</strong>
              </div>

              <div className="dashboard-item">
                <span>Today's Sales</span>
                <strong>₹8,240</strong>
              </div>

            </div>

          </div>

        </div>
      </section>

      <TrustedCompanies />

      <Features />

      <DashboardPreview />

      <AISection />

      <Footer />

    </>
  );
}

export default Landing;
