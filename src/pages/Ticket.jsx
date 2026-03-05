import React from "react";
import { useParams } from "react-router-dom";
import QRCode from "react-qr-code";

export default function Ticket() {
  const { ticketId } = useParams();

  return (
    <div className="center">
      <div className="card w480" style={{ textAlign: "center", padding: "40px" }}>
        <div className="card-title">Your Entry Ticket</div>
        <p className="muted">Show this QR code at the entrance</p>

        {/* The QR Code Wrapper */}
        <div style={{ 
          background: "white", 
          padding: "20px", 
          borderRadius: "16px", 
          display: "inline-block",
          margin: "24px 0" 
        }}>
          <QRCode 
            value={ticketId} 
            size={200}
            fgColor="#0b0e14" // Matches your dark bg for contrast
          />
        </div>

        <div className="divider" />
        
        <div style={{ marginTop: "20px" }}>
          <div className="muted small">Ticket ID</div>
          <div className="mono" style={{ fontSize: "1.2rem", color: "var(--primary)" }}>
            {ticketId}
          </div>
        </div>

        <button 
          className="btn btn-outline" 
          style={{ marginTop: "30px", width: "100%" }}
          onClick={() => window.print()}
        >
          Download PDF / Print
        </button>
      </div>
    </div>
  );
}