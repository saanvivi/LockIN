import React from "react";
import { NavLink, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const nav = useNavigate();

  function handleLogout() {
    logout();
    nav("/login");
  }

  return (
    <nav className="navbar">
      <Link to="/" className="brand">
        LockIN
      </Link>

      <div className="navlinks">
        <NavLink to="/" className="navlink" end>
          Home
        </NavLink>

        {user?.role === "organizer" && (
          <NavLink to="/organizer/events" className="navlink">
            Dashboard
          </NavLink>
        )}

        {(user?.role === "staff" || user?.role === "organizer") && (
          <NavLink to="/staff/scanner" className="navlink">
            Scanner
          </NavLink>
        )}

        {/* Action Group: Login/Logout, Signup, and Role Badge */}
        <div className="nav-actions" style={{ gap: "10px" }}>
          {!user ? (
            <>
              <Link to="/login">
                <button className="btn btn-outline small-btn">
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button className="btn btn-primary small-btn">
                  Sign Up
                </button>
              </Link>
            </>
          ) : (
            <>
              <span className="user-badge">
                {user.role}
              </span>
              <button
                className="btn btn-outline small-btn"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}