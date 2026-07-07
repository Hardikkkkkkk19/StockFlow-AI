import { useState } from "react";
import Slidebar from "../components/Slidebar";
import TopBar from "../components/TopBar";

function Settings() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  function saveSettings() {
    alert("Settings Saved Successfully");
  }

  return (
    <div className="dashboard-layout">
      <Slidebar />

      <div className="dashboard-content">
        <TopBar />

        <main className="dashboard-main settings-page">
          <style>
            {`
              .settings-page {
                min-height: calc(100vh - 80px);
              }

              .settings-kicker {
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

              .settings-grid {
                display: grid;
                grid-template-columns: minmax(0, 1.15fr) minmax(280px, .85fr);
                gap: 26px;
                margin-top: 28px;
              }

              .settings-card {
                background: #151d30;
                border: 1px solid rgba(255,255,255,.08);
                border-radius: 18px;
                padding: 28px;
                box-shadow: 0 18px 45px rgba(0,0,0,.25);
              }

              .settings-card.featured {
                position: relative;
                overflow: hidden;
              }

              .settings-card.featured::before {
                content: "";
                position: absolute;
                inset: 0;
                background:
                  radial-gradient(circle at 86% 0%, rgba(37,99,235,.3), transparent 30%),
                  linear-gradient(135deg, rgba(124,58,237,.14), transparent 56%);
                pointer-events: none;
              }

              .settings-card > * {
                position: relative;
                z-index: 1;
              }

              .settings-card h2 {
                font-size: 24px;
                margin-bottom: 8px;
              }

              .settings-muted {
                color: #94a3b8;
                line-height: 1.7;
              }

              .settings-options {
                display: grid;
                gap: 16px;
                margin: 26px 0;
              }

              .settings-option {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 18px;
                padding: 18px;
                border-radius: 16px;
                background: rgba(31,41,55,.55);
                border: 1px solid rgba(255,255,255,.08);
              }

              .settings-option strong {
                display: block;
                margin-bottom: 5px;
              }

              .settings-toggle {
                position: relative;
                width: 56px;
                height: 32px;
                flex: 0 0 56px;
              }

              .settings-toggle input {
                opacity: 0;
                width: 0;
                height: 0;
              }

              .settings-slider {
                position: absolute;
                inset: 0;
                border-radius: 999px;
                background: #334155;
                border: 1px solid rgba(255,255,255,.12);
                transition: .2s ease;
              }

              .settings-slider::before {
                content: "";
                position: absolute;
                width: 24px;
                height: 24px;
                left: 4px;
                top: 3px;
                border-radius: 50%;
                background: #fff;
                transition: .2s ease;
              }

              .settings-toggle input:checked + .settings-slider {
                background: linear-gradient(135deg, #7c3aed, #2563eb);
              }

              .settings-toggle input:checked + .settings-slider::before {
                transform: translateX(23px);
              }

              .settings-list {
                display: grid;
                gap: 14px;
                margin-top: 22px;
              }

              .settings-list-item {
                display: flex;
                justify-content: space-between;
                gap: 16px;
                padding: 16px 0;
                border-bottom: 1px solid rgba(255,255,255,.08);
              }

              .settings-list-item:last-child {
                border-bottom: 0;
              }

              .settings-pill {
                align-self: flex-start;
                color: #86efac;
                background: rgba(16,185,129,.12);
                border: 1px solid rgba(16,185,129,.26);
                border-radius: 999px;
                padding: 7px 11px;
                font-size: 13px;
                font-weight: 700;
                white-space: nowrap;
              }

              @media (max-width: 980px) {
                .settings-grid {
                  grid-template-columns: 1fr;
                }
              }

              @media (max-width: 640px) {
                .settings-page {
                  padding: 24px;
                }

                .settings-option,
                .settings-list-item {
                  align-items: flex-start;
                  flex-direction: column;
                }
              }
            `}
          </style>

          <p className="settings-kicker">Workspace Controls</p>
          <h1 className="dashboard-title">Settings</h1>

          <section className="settings-grid">
            <div className="settings-card featured">
              <h2>Preferences</h2>
              <p className="settings-muted">
                Tune your dashboard experience and alert behavior for daily inventory work.
              </p>

              <div className="settings-options">
                <label className="settings-option">
                  <span>
                    <strong>Dark Mode</strong>
                    <span className="settings-muted">Keep the workspace in a focused dark theme.</span>
                  </span>

                  <span className="settings-toggle">
                    <input
                      type="checkbox"
                      checked={darkMode}
                      onChange={() => setDarkMode(!darkMode)}
                    />
                    <span className="settings-slider" />
                  </span>
                </label>

                <label className="settings-option">
                  <span>
                    <strong>Email Notifications</strong>
                    <span className="settings-muted">Receive stock alerts and account updates.</span>
                  </span>

                  <span className="settings-toggle">
                    <input
                      type="checkbox"
                      checked={notifications}
                      onChange={() => setNotifications(!notifications)}
                    />
                    <span className="settings-slider" />
                  </span>
                </label>
              </div>

              <button className="primary-btn" onClick={saveSettings}>
                Save Settings
              </button>
            </div>

            <aside className="settings-card">
              <h2>Account Status</h2>
              <p className="settings-muted">Everything looks ready for your inventory dashboard.</p>

              <div className="settings-list">
                <div className="settings-list-item">
                  <div>
                    <strong>Security</strong>
                    <p className="settings-muted">Session is active and protected.</p>
                  </div>
                  <span className="settings-pill">Good</span>
                </div>

                <div className="settings-list-item">
                  <div>
                    <strong>Workspace Plan</strong>
                    <p className="settings-muted">Premium features are available.</p>
                  </div>
                  <span className="settings-pill">Premium</span>
                </div>

                <div className="settings-list-item">
                  <div>
                    <strong>AI Tools</strong>
                    <p className="settings-muted">Assistant and analysis tools are enabled.</p>
                  </div>
                  <span className="settings-pill">Active</span>
                </div>
              </div>
            </aside>
          </section>
        </main>
      </div>
    </div>
  );
}

export default Settings;
