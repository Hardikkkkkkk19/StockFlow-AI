import { useState } from "react";
import Slidebar from "../components/Slidebar";
import TopBar from "../components/TopBar";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    alert("Message Sent Successfully!");

    setName("");
    setEmail("");
    setMessage("");
  }

  return (
    <div className="dashboard-layout">
      <Slidebar />

      <div className="dashboard-content">
        <TopBar />

        <main className="dashboard-main contact-page">
          <style>
            {`
              .contact-page {
                min-height: calc(100vh - 80px);
              }

              .contact-kicker {
                display: inline-flex;
                color: #a78bfa;
                background: rgba(124,58,237,.16);
                border: 1px solid rgba(167,139,250,.25);
                border-radius: 999px;
                padding: 8px 12px;
                font-size: 13px;
                font-weight: 700;
                margin-bottom: 16px;
              }

              .contact-layout {
                display: grid;
                grid-template-columns: minmax(280px, 390px) minmax(0, 1fr);
                gap: 28px;
                align-items: stretch;
                margin-top: 28px;
              }

              .contact-card {
                background: #151d30;
                border: 1px solid rgba(255,255,255,.08);
                border-radius: 18px;
                padding: 28px;
                box-shadow: 0 18px 45px rgba(0,0,0,.25);
              }

              .contact-info {
                position: relative;
                overflow: hidden;
              }

              .contact-info::before {
                content: "";
                position: absolute;
                inset: 0;
                background:
                  radial-gradient(circle at 12% 6%, rgba(124,58,237,.38), transparent 30%),
                  linear-gradient(145deg, rgba(37,99,235,.16), transparent 55%);
                pointer-events: none;
              }

              .contact-card > * {
                position: relative;
                z-index: 1;
              }

              .contact-card h2 {
                font-size: 25px;
                margin-bottom: 10px;
              }

              .contact-muted {
                color: #94a3b8;
                line-height: 1.7;
              }

              .contact-methods {
                display: grid;
                gap: 14px;
                margin-top: 28px;
              }

              .contact-method {
                display: flex;
                gap: 14px;
                padding: 16px;
                border-radius: 15px;
                background: rgba(31,41,55,.52);
                border: 1px solid rgba(255,255,255,.08);
              }

              .contact-icon {
                width: 42px;
                height: 42px;
                flex: 0 0 42px;
                border-radius: 12px;
                display: grid;
                place-items: center;
                background: linear-gradient(135deg, rgba(124,58,237,.36), rgba(37,99,235,.34));
                font-weight: 800;
              }

              .contact-method strong {
                display: block;
                margin-bottom: 5px;
              }

              .contact-form {
                display: grid;
                gap: 18px;
              }

              .contact-field {
                display: grid;
                gap: 8px;
              }

              .contact-field label {
                color: #cbd5e1;
                font-size: 14px;
                font-weight: 700;
              }

              .contact-field input,
              .contact-field textarea {
                width: 100%;
                background: rgba(31,41,55,.72);
                color: #fff;
                border: 1px solid rgba(255,255,255,.1);
                border-radius: 13px;
                padding: 15px 16px;
                font-size: 15px;
                transition: border-color .2s ease, box-shadow .2s ease;
              }

              .contact-field textarea {
                min-height: 170px;
                resize: vertical;
                line-height: 1.6;
              }

              .contact-field input:focus,
              .contact-field textarea:focus {
                border-color: rgba(124,58,237,.7);
                box-shadow: 0 0 0 4px rgba(124,58,237,.12);
              }

              @media (max-width: 980px) {
                .contact-layout {
                  grid-template-columns: 1fr;
                }
              }

              @media (max-width: 640px) {
                .contact-page {
                  padding: 24px;
                }
              }
            `}
          </style>

          <p className="contact-kicker">Support Desk</p>
          <h1 className="dashboard-title">Contact Us</h1>

          <section className="contact-layout">
            <aside className="contact-card contact-info">
              <h2>Need a hand?</h2>
              <p className="contact-muted">
                Send your question, bug report, or stock workflow request. We will route it to the right place.
              </p>

              <div className="contact-methods">
                <div className="contact-method">
                  <span className="contact-icon">@</span>
                  <div>
                    <strong>Email Support</strong>
                    <p className="contact-muted">stockflowai@gmail.com</p>
                  </div>
                </div>

                <div className="contact-method">
                  <span className="contact-icon">24</span>
                  <div>
                    <strong>Response Window</strong>
                    <p className="contact-muted">Usually within one business day.</p>
                  </div>
                </div>

                <div className="contact-method">
                  <span className="contact-icon">AI</span>
                  <div>
                    <strong>Inventory Help</strong>
                    <p className="contact-muted">Ask about product, analytics, or AI assistant issues.</p>
                  </div>
                </div>
              </div>
            </aside>

            <div className="contact-card">
              <h2>Send Message</h2>
              <p className="contact-muted">Add enough detail so the team can understand the request quickly.</p>

              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="contact-field">
                  <label htmlFor="contact-name">Full Name</label>
                  <input
                    id="contact-name"
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="contact-field">
                  <label htmlFor="contact-email">Email</label>
                  <input
                    id="contact-email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="contact-field">
                  <label htmlFor="contact-message">Message</label>
                  <textarea
                    id="contact-message"
                    placeholder="Tell us what you need help with..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  />
                </div>

                <button className="primary-btn">Send Message</button>
              </form>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default Contact;
