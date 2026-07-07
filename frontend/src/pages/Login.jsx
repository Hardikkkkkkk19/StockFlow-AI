import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(e) {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("Please register first.");
      navigate("/register");
      return;
    }

    if (
      email === user.email &&
      password === user.password
    ) {
      localStorage.setItem("isLoggedIn", "true");

      alert("Login Successful");

      navigate("/landing");
    } else {
      alert("Invalid Email or Password");
    }
  }

  return (
    <section className="auth-page">

      <div className="auth-card">

        <h2>Welcome Back</h2>

        <p>Login to StockFlow AI</p>

        <form onSubmit={handleLogin}>

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="primary-btn auth-btn"
          >
            Login
          </button>

        </form>

        <span>
          Don't have an account?{" "}
          <Link to="/register">
            Register
          </Link>
        </span>

      </div>

    </section>
  );
}

export default Login;