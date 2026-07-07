import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem("isLoggedIn");

  function handleLogout() {
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  }

  return (
    <header className="navbar">
      <div className="container navbar-container">

        <Link to="/" className="logo">
          StockFlow <span>AI</span>
        </Link>

        <nav>
          <ul className="nav-links">

            <li><Link to="/landing">Home</Link></li>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/analytics">Analytics</Link></li>
            <li><Link to="/ai">AI</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </nav>

        <div className="nav-actions">

          {isLoggedIn ? (
            <button
              className="primary-btn"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/" className="login-link">
                Login
              </Link>

              <Link to="/register" className="primary-btn">
                Register
              </Link>
            </>
          )}

        </div>

      </div>
    </header>
  );
}

export default Navbar;