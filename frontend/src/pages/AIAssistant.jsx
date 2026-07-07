import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";
import { askGroq } from "../services/groq";

import Slidebar from "../components/Slidebar";
import TopBar from "../components/TopBar";

function AIAssistant() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  async function getProducts() {
    const { data, error } = await supabase
      .from("inventory_items")
      .select("*");

    if (error) {
      console.log(error);
      return;
    }

    setProducts(data);
  }

  async function handleAsk() {
    if (!prompt.trim()) return;

    setLoading(true);

    try {
      const inventory = products
        .map(
          (item) =>
            `Product: ${item.name}, Category: ${item.category}, Price: ₹${item.price}, Stock: ${item.stock}`
        )
        .join("\n");

      const reply = await askGroq(prompt, inventory);

      setResponse(reply);
    } catch (error) {
      console.log(error);
      setResponse("Something went wrong.");
    }

    setLoading(false);
  }

  return (
    <div className="dashboard-layout">
      <Slidebar />

      <div className="dashboard-content">
        <TopBar />

        <main className="dashboard-main ai-page">
          <style>
            {`
              .ai-page {
                min-height: calc(100vh - 80px);
              }

              .ai-kicker {
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

              .ai-workspace {
                display: grid;
                grid-template-columns: minmax(0, 1.35fr) minmax(260px, 320px);
                gap: 22px;
                margin-top: 22px;
                align-items: start;
              }

              .ai-card {
                background: #151d30;
                border: 1px solid rgba(255,255,255,.08);
                border-radius: 18px;
                padding: 22px;
                box-shadow: 0 18px 45px rgba(0,0,0,.25);
              }

              .ai-hero-card {
                position: relative;
                overflow: hidden;
              }

              .ai-hero-card::before {
                content: "";
                position: absolute;
                inset: 0;
                background:
                  radial-gradient(circle at 88% 0%, rgba(37,99,235,.32), transparent 34%),
                  linear-gradient(135deg, rgba(124,58,237,.15), transparent 58%);
                pointer-events: none;
              }

              .ai-card > * {
                position: relative;
                z-index: 1;
              }

              .ai-card h2 {
                font-size: 22px;
                margin-bottom: 8px;
              }

              .ai-muted {
                color: #94a3b8;
                line-height: 1.55;
              }

              .ai-prompt-box {
                display: grid;
                gap: 14px;
                margin-top: 16px;
              }

              .ai-prompt-box textarea {
                width: 100%;
                min-height: 124px;
                resize: none;
                background: rgba(31,41,55,.72);
                color: #fff;
                border: 1px solid rgba(255,255,255,.1);
                border-radius: 15px;
                padding: 16px 18px;
                font-size: 16px;
                line-height: 1.55;
                transition: border-color .2s ease, box-shadow .2s ease;
              }

              .ai-prompt-box textarea:focus {
                border-color: rgba(124,58,237,.7);
                box-shadow: 0 0 0 4px rgba(124,58,237,.12);
              }

              .ai-actions {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 16px;
                flex-wrap: wrap;
              }

              .ai-count {
                color: #94a3b8;
                font-size: 14px;
              }

              .ai-side {
                display: grid;
                gap: 14px;
              }

              .ai-mini-card {
                background: #151d30;
                border: 1px solid rgba(255,255,255,.08);
                border-radius: 16px;
                padding: 18px;
              }

              .ai-mini-card span {
                color: #94a3b8;
                display: block;
                margin-bottom: 8px;
                font-size: 14px;
              }

              .ai-mini-card strong {
                display: block;
                font-size: 30px;
              }

              .ai-suggestions {
                display: grid;
                gap: 10px;
                margin-top: 16px;
              }

              .ai-suggestion {
                padding: 13px 14px;
                border-radius: 13px;
                background: rgba(31,41,55,.58);
                border: 1px solid rgba(255,255,255,.08);
                color: #dbeafe;
                text-align: left;
                line-height: 1.45;
              }

              .ai-suggestion:hover {
                border-color: rgba(124,58,237,.5);
              }

              .ai-response {
                margin-top: 18px;
              }

              .ai-response-body {
                min-height: 230px;
                margin-top: 14px;
                padding: 18px;
                border-radius: 15px;
                background: rgba(31,41,55,.55);
                border: 1px solid rgba(255,255,255,.08);
                color: #e5e7eb;
                white-space: pre-wrap;
                line-height: 1.8;
              }

              .ai-response-empty {
                color: #94a3b8;
              }

              @media (max-width: 1050px) {
                .ai-workspace {
                  grid-template-columns: 1fr;
                }
              }

              @media (max-width: 640px) {
                .ai-page {
                  padding: 24px;
                }

                .ai-actions {
                  align-items: stretch;
                  flex-direction: column;
                }
              }
            `}
          </style>

          <p className="ai-kicker">Inventory Intelligence</p>
          <h1 className="dashboard-title">AI Assistant</h1>

          <section className="ai-workspace">
            <div>
              <div className="ai-card ai-hero-card">
                <h2>Ask about your inventory</h2>
                <p className="ai-muted">
                  Use your product data to spot low stock, pricing issues, trends, and quick operational decisions.
                </p>

                <div className="ai-prompt-box">
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Example: Which products need restocking this week?"
                  />

                  <div className="ai-actions">
                    <button className="primary-btn" onClick={handleAsk} disabled={loading}>
                      {loading ? "Thinking..." : "Ask AI"}
                    </button>
                    <span className="ai-count">{products.length} inventory items loaded</span>
                  </div>
                </div>
              </div>

              <div className="ai-card ai-response">
                <h2>AI Response</h2>
                <div className={`ai-response-body ${response ? "" : "ai-response-empty"}`}>
                  {response || "Ask a question to start. Your answer will appear here."}
                </div>
              </div>
            </div>

            <aside className="ai-side">
              <div className="ai-mini-card">
                <span>Connected Products</span>
                <strong>{products.length}</strong>
              </div>

              <div className="ai-mini-card">
                <h2>Try Asking</h2>
                <div className="ai-suggestions">
                  <button
                    className="ai-suggestion"
                    onClick={() => setPrompt("Which products are running low on stock?")}
                  >
                    Which products are running low on stock?
                  </button>
                  <button
                    className="ai-suggestion"
                    onClick={() => setPrompt("Summarize my inventory by category.")}
                  >
                    Summarize my inventory by category.
                  </button>
                  <button
                    className="ai-suggestion"
                    onClick={() => setPrompt("Which items should I prioritize for reorder?")}
                  >
                    Which items should I prioritize for reorder?
                  </button>
                </div>
              </div>
            </aside>
          </section>
        </main>
      </div>
    </div>
  );
}

export default AIAssistant;
