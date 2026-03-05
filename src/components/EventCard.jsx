import React from "react";
import { useNavigate } from "react-router-dom";

export default function EventCard({ event }) {
  const nav = useNavigate();

  return (
    <div className="card" style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "12px" }}>
      <div className="card-title" style={{ fontSize: "1.5rem", marginBottom: "4px" }}>{event.title}</div>
      
      <div className="muted small">
        📅 {new Date(event.dateTime).toLocaleDateString()} at {new Date(event.dateTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
        <br/>
        📍 {event.venue}
      </div>

      <p style={{ flex: 1, margin: "12px 0", fontSize: "0.95rem", color: "#cbd5e1" }}>
        {event.description}
      </p>

      {/* FIXED PATH: matches /register/:eventId */}
      <button 
        className="btn btn-primary" 
        onClick={() => nav(`/register/${event._id}`)}
        style={{ width: "100%" }}
      >
        Get Tickets
      </button>
    </div>
  );
}