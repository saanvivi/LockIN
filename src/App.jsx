import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup"; // <-- Added Signup import
import OrganizerEvents from "./pages/OrganizerEvents";
import AttendeeRegister from "./pages/AttendeeRegister";
import Ticket from "./pages/Ticket";
import StaffScanner from "./pages/StaffScanner";

import { AuthProvider, useAuth } from "./context/AuthContext";

function Protected({ children, roles }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/" replace />;
  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} /> {/* <-- Added Signup route */}

          <Route
            path="/organizer/events"
            element={
              <Protected roles={["organizer"]}>
                <OrganizerEvents />
              </Protected>
            }
          />

          <Route path="/register/:eventId" element={<AttendeeRegister />} />
          <Route path="/ticket/:ticketId" element={<Ticket />} />

          <Route
            path="/staff/scanner"
            element={
              <Protected roles={["staff", "organizer"]}>
                <StaffScanner />
              </Protected>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}