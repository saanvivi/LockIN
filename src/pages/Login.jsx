import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthAPI } from "../api/endpoints";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const nav = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setErr("");
    setLoading(true);

    try {
      const res = await AuthAPI.login(email, password);
      const data = res.data;

      // Update global context & LocalStorage via your useAuth hook
      login({ user: data.user, token: data.token });

      // Role-based redirect
      const role = data.user?.role;
      if (role === "organizer") {
        nav("/organizer/events");
      } else if (role === "staff") {
        nav("/staff/scanner");
      } else {
        nav("/");
      }
    } catch (e2) {
      setErr(e2?.response?.data?.message || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="card w480">
        <header>
          <div className="card-title">Welcome back</div>
          <p className="muted">Enter your details to access your dashboard.</p>
        </header>

        {err && (
          <div className="alert">
            <span>⚠️</span> {err}
          </div>
        )}

        <form onSubmit={onSubmit} className="form">
          <label>
            Email Address
            <input
              type="email"
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </label>

          <label>
            Password
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </label>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner"></span> Logging in...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <div style={{ marginTop: "24px", textAlign: "center", display: "flex", flexDirection: "column", gap: "10px" }}>
           <p className="muted" style={{ fontSize: "0.9rem", margin: 0 }}>
             Don't have an account? <Link to="/Signup" style={{ color: "var(--primary)", fontWeight: "600" }}>Sign up</Link>
           </p>
           
        </div>
      </div>
    </div>
  );
}