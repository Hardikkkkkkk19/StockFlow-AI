import { useState } from "react";
import { useNavigate } from "react-router-dom";

function TopBar() {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);

  function handleLogout() {
    localStorage.removeItem("isLoggedIn");
    alert("Logged Out Successfully");
    navigate("/");
  }

  return (
    <header
      className="topbar"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h2>StockFlow AI Dashboard</h2>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "15px",
          position: "relative",
        }}
      >
        <button
          className="primary-btn"
          onClick={() => navigate("/add-product")}
        >
          + Add Product
        </button>

        <button
          onClick={() =>
            setShowNotifications(!showNotifications)
          }
          style={{
            fontSize: "22px",
            background: "white",
            border: "none",
            cursor: "pointer",
            position: "relative",
          }}
        >
          🔔

          <span
            style={{
              position: "absolute",
              top: "-5px",
              right: "-5px",
              background: "red",
              color: "white",
              borderRadius: "50%",
              width: "18px",
              height: "18px",
              fontSize: "11px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            3
          </span>
        </button>

        {showNotifications && (
          <div
            style={{
              position: "absolute",
              top: "55px",
              right: "70px",
              width: "280px",
              background: "#fff",
              color: "#000",
              borderRadius: "12px",
              padding: "15px",
              boxShadow: "0 10px 25px rgba(0,0,0,.15)",
              zIndex: 100,
            }}
          >
            <h4>Notifications</h4>

            <p>⚠️ Mouse stock is below 10</p>

            <p>✅ Laptop added successfully</p>

            <p>📈 Inventory updated</p>
          </div>
        )}

        <button
          className="delete-btn"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </header>
  );
}

export default TopBar;