import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const nav = useNavigate();
  const { login } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("organizer"); // Default role
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);

    // MOCK LOGIN PROCESS (Since there is no backend connectivity yet)
    setTimeout(() => {
      const mockUser = { name, email, role };
      const mockToken = "fake-jwt-token-12345";

      // Log the user in with the mocked data
      login({ user: mockUser, token: mockToken });

      // Redirect based on the role they chose
      if (role === "organizer") {
        nav("/organizer/events");
      } else if (role === "staff") {
        nav("/staff/scanner");
      } else {
        nav("/");
      }
      
      setLoading(false);
    }, 1000); // Fakes a 1-second network request
  }

  return (
    <div className="auth-page">
      <div className="card w480">
        <header>
          <div className="card-title">Create Account</div>
          <p className="muted">Sign up to start managing effortlessly.</p>
        </header>

        <form onSubmit={onSubmit} className="form">
          <label>
            Full Name
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>

          <label>
            Email Address
            <input
              type="email"
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
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
              minLength={6}
            />
          </label>

          <label>
            I am a...
            <select 
              value={role} 
              onChange={(e) => setRole(e.target.value)}
              style={{
                width: "100%",
                padding: "16px 20px",
                fontSize: "1.15rem",
                borderRadius: "14px",
                border: "1px solid var(--border)",
                background: "#0f1117",
                color: "var(--text)",
                outline: "none",
                appearance: "none"
              }}
            >
              <option value="organizer">Event Organizer</option>
              <option value="staff">Event Staff</option>
            </select>
          </label>

          <button type="submit" className="btn btn-primary" disabled={loading} style={{ marginTop: "10px" }}>
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <div style={{ marginTop: "24px", textAlign: "center" }}>
           <p className="muted" style={{ fontSize: "0.9rem" }}>
             Already have an account? <Link to="/login" style={{ color: "var(--primary)", fontWeight: "600" }}>Sign in</Link>
           </p>
        </div>
      </div>
    </div>
  );
}