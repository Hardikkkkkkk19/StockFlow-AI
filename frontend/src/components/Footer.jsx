function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="container footer-container">

        <div className="footer-left">

          <h2>
            StockFlow <span>AI</span>
          </h2>

          <p>
            AI Powered Inventory Management System
            built with React, Supabase and Groq AI.
          </p>

        </div>

        <div className="footer-links">

          <a href="#features">Features</a>
          <a href="#analytics">Analytics</a>
          <a href="#ai">AI Assistant</a>
          <a href="/login">Login</a>

        </div>

      </div>

      <div className="copyright">
        © 2026 StockFlow AI. All Rights Reserved.
      </div>

    </footer>
  );
}

export default Footer;