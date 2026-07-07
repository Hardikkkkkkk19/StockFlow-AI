import Slidebar from "../components/Slidebar";
import TopBar from "../components/TopBar";

function getStoredUser() {
  try {
    return JSON.parse(localStorage.getItem("user"));
  } catch {
    return null;
  }
}

function Profile() {
  const user = getStoredUser();
  const name = user?.name || "StockFlow User";
  const email = user?.email || "user@stockflow.ai";
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  const profileDetails = [
    { label: "Role", value: "Inventory Manager" },
    { label: "Company", value: "StockFlow AI" },
    { label: "Status", value: "Active" },
    { label: "Membership", value: "Premium" },
  ];

  const stats = [
    { label: "Products Managed", value: "248" },
    { label: "Low Stock Alerts", value: "12" },
    { label: "AI Reports", value: "36" },
  ];

  return (
    <div className="dashboard-layout">
      <Slidebar />

      <div className="dashboard-content">
        <TopBar />

        <main className="dashboard-main profile-page">
          <style>
            {`
              .profile-page {
                min-height: calc(100vh - 80px);
              }

              .profile-shell {
                display: grid;
                grid-template-columns: minmax(280px, 380px) minmax(0, 1fr);
                gap: 28px;
                align-items: start;
                margin-top: 28px;
              }

              .profile-hero,
              .profile-panel,
              .profile-stat {
                background: #151d30;
                border: 1px solid rgba(255,255,255,.08);
                box-shadow: 0 18px 45px rgba(0,0,0,.26);
              }

              .profile-hero {
                position: relative;
                overflow: hidden;
                border-radius: 18px;
                padding: 30px;
              }

              .profile-hero::before {
                content: "";
                position: absolute;
                inset: 0;
                background:
                  radial-gradient(circle at 18% 0%, rgba(124,58,237,.38), transparent 32%),
                  linear-gradient(135deg, rgba(37,99,235,.16), transparent 52%);
                pointer-events: none;
              }

              .profile-hero > * {
                position: relative;
                z-index: 1;
              }

              .profile-avatar {
                width: 118px;
                height: 118px;
                border-radius: 28px;
                display: grid;
                place-items: center;
                margin-bottom: 22px;
                background: linear-gradient(135deg, #7c3aed, #2563eb);
                color: #fff;
                font-size: 42px;
                font-weight: 800;
                border: 4px solid rgba(255,255,255,.16);
                box-shadow: 0 18px 34px rgba(37,99,235,.25);
              }

              .profile-eyebrow {
                display: inline-flex;
                align-items: center;
                gap: 8px;
                color: #a78bfa;
                background: rgba(124,58,237,.16);
                border: 1px solid rgba(167,139,250,.25);
                border-radius: 999px;
                padding: 8px 12px;
                font-size: 13px;
                font-weight: 700;
                margin-bottom: 16px;
              }

              .profile-hero h1 {
                font-size: 34px;
                line-height: 1.15;
                margin-bottom: 8px;
              }

              .profile-email {
                color: #94a3b8;
                line-height: 1.6;
                overflow-wrap: anywhere;
              }

              .profile-status-row {
                display: flex;
                flex-wrap: wrap;
                gap: 10px;
                margin-top: 24px;
              }

              .profile-pill {
                padding: 9px 12px;
                border-radius: 999px;
                background: rgba(15,23,42,.65);
                border: 1px solid rgba(255,255,255,.1);
                color: #dbeafe;
                font-size: 13px;
                font-weight: 700;
              }

              .profile-pill.success {
                color: #86efac;
                border-color: rgba(16,185,129,.28);
                background: rgba(16,185,129,.12);
              }

              .profile-right {
                display: grid;
                gap: 24px;
              }

              .profile-stats {
                display: grid;
                grid-template-columns: repeat(3, minmax(0, 1fr));
                gap: 18px;
              }

              .profile-stat {
                border-radius: 16px;
                padding: 22px;
              }

              .profile-stat span {
                display: block;
                color: #94a3b8;
                font-size: 14px;
                margin-bottom: 10px;
              }

              .profile-stat strong {
                display: block;
                font-size: 30px;
                line-height: 1;
              }

              .profile-panel {
                border-radius: 18px;
                padding: 26px;
              }

              .profile-panel-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                gap: 18px;
                margin-bottom: 22px;
              }

              .profile-panel h2 {
                font-size: 22px;
              }

              .profile-panel-note {
                color: #94a3b8;
                font-size: 14px;
              }

              .profile-detail-grid {
                display: grid;
                grid-template-columns: repeat(2, minmax(0, 1fr));
                gap: 16px;
              }

              .profile-detail {
                border-radius: 14px;
                padding: 18px;
                background: rgba(31,41,55,.58);
                border: 1px solid rgba(255,255,255,.07);
              }

              .profile-detail span {
                display: block;
                color: #94a3b8;
                font-size: 13px;
                margin-bottom: 8px;
              }

              .profile-detail strong {
                display: block;
                font-size: 17px;
              }

              .profile-activity {
                display: grid;
                gap: 14px;
              }

              .profile-activity-item {
                display: flex;
                align-items: center;
                gap: 14px;
                padding: 16px;
                border-radius: 14px;
                background: rgba(31,41,55,.48);
                border: 1px solid rgba(255,255,255,.07);
              }

              .profile-activity-icon {
                width: 42px;
                height: 42px;
                flex: 0 0 42px;
                border-radius: 12px;
                display: grid;
                place-items: center;
                background: linear-gradient(135deg, rgba(124,58,237,.35), rgba(37,99,235,.32));
                color: #fff;
                font-weight: 800;
              }

              .profile-activity-item strong {
                display: block;
                margin-bottom: 4px;
              }

              .profile-activity-item span {
                color: #94a3b8;
                font-size: 14px;
              }

              @media (max-width: 1050px) {
                .profile-shell {
                  grid-template-columns: 1fr;
                }
              }

              @media (max-width: 760px) {
                .profile-page {
                  padding: 24px;
                }

                .profile-stats,
                .profile-detail-grid {
                  grid-template-columns: 1fr;
                }

                .profile-panel-header {
                  align-items: flex-start;
                  flex-direction: column;
                }
              }
            `}
          </style>

          <div>
            <p className="profile-eyebrow">Account Overview</p>
            <h1 className="dashboard-title">My Profile</h1>
          </div>

          <section className="profile-shell">
            <aside className="profile-hero">
              <div className="profile-avatar">{initials || "SF"}</div>
              <h1>{name}</h1>
              <p className="profile-email">{email}</p>

              <div className="profile-status-row">
                <span className="profile-pill success">Active</span>
                <span className="profile-pill">Premium Workspace</span>
                <span className="profile-pill">Verified</span>
              </div>
            </aside>

            <div className="profile-right">
              <div className="profile-stats">
                {stats.map((stat) => (
                  <div className="profile-stat" key={stat.label}>
                    <span>{stat.label}</span>
                    <strong>{stat.value}</strong>
                  </div>
                ))}
              </div>

              <section className="profile-panel">
                <div className="profile-panel-header">
                  <h2>Profile Details</h2>
                  <p className="profile-panel-note">Synced with your dashboard account</p>
                </div>

                <div className="profile-detail-grid">
                  {profileDetails.map((detail) => (
                    <div className="profile-detail" key={detail.label}>
                      <span>{detail.label}</span>
                      <strong>{detail.value}</strong>
                    </div>
                  ))}
                </div>
              </section>

              <section className="profile-panel">
                <div className="profile-panel-header">
                  <h2>Recent Workspace Activity</h2>
                  <p className="profile-panel-note">A cleaner snapshot of your account</p>
                </div>

                <div className="profile-activity">
                  <div className="profile-activity-item">
                    <div className="profile-activity-icon">AI</div>
                    <div>
                      <strong>Inventory insights enabled</strong>
                      <span>AI reports are ready for stock movement reviews.</span>
                    </div>
                  </div>

                  <div className="profile-activity-item">
                    <div className="profile-activity-icon">PR</div>
                    <div>
                      <strong>Premium access active</strong>
                      <span>Your account has access to advanced analytics and alerts.</span>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default Profile;
