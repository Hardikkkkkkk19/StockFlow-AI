function AISection() {
  return (
    <section className="ai-section" id="ai">
      <div className="container ai-container">

        <div className="ai-left">
          <span className="hero-tag">Groq AI Assistant</span>

          <h2>
            Let AI Manage <br />
            Your Inventory
          </h2>

          <p>
            Ask AI questions, generate inventory insights, detect low stock
            products and receive smart recommendations instantly.
          </p>

          <button className="primary-btn">
            Try AI Assistant
          </button>
        </div>

        <div className="ai-right">

          <div className="chat-card">

            <div className="chat bot">
              🤖 Low stock detected for Wireless Mouse.
            </div>

            <div className="chat user">
              👤 Show products below quantity 10.
            </div>

            <div className="chat bot">
              🤖 Found 18 products with low inventory.
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default AISection;