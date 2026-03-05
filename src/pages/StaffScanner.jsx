import React, { useEffect, useMemo, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { CheckInAPI } from "../api/endpoints";

export default function StaffScanner() {
  const [status, setStatus] = useState("Ready");
  const [lastResult, setLastResult] = useState(null); // { ok, message, ... }
  const [err, setErr] = useState("");

  const readerId = useMemo(() => "qr-reader", []);
  const qrRef = useRef(null);

  useEffect(() => {
    let html5Qr = null;

    async function start() {
      setErr("");
      try {
        html5Qr = new Html5Qrcode(readerId);
        qrRef.current = html5Qr;

        await html5Qr.start(
          { facingMode: "environment" },
          { 
            fps: 10,
            
            // Calculate a perfect square that is 70% of the smallest video dimension
            qrbox: (viewfinderWidth, viewfinderHeight) => {
              const minEdgeSize = Math.min(viewfinderWidth, viewfinderHeight);
              const size = Math.floor(minEdgeSize * 0.7);
              return { width: size, height: size };
            }
          },
          async (decodedText) => {
            // decodedText could be ticketId or token
            setStatus("Verifying...");
            await verify(decodedText);
            setStatus("Ready");
          },
          () => {} // Ignore continuous scan failures
        );
      } catch (e) {
        setErr("Camera scan failed. Use manual verify below.");
      }
    }

    start();

    return () => {
      (async () => {
        try {
          if (qrRef.current) {
            await qrRef.current.stop();
            await qrRef.current.clear();
          }
        } catch {}
      })();
    };
  }, [readerId]);

  const [manual, setManual] = useState("");

  async function verify(qrText) {
    try {
      const res = await CheckInAPI.verify({ qr: qrText });
      // Expected response:
      // { ok: true, message: "Check-in success", attendeeName, eventTitle, ... }
      setLastResult(res.data);
      setErr("");
      setManual(""); // Clear input on success
    } catch (e) {
      const msg = e?.response?.data?.message || "Invalid/used ticket.";
      setLastResult({ ok: false, message: msg });
    }
  }

  return (
    <div className="grid2" style={{ gap: "2rem" }}>
      <div className="card" style={{ padding: "1.5rem" }}>
        <div className="card-title" style={{ marginBottom: "1rem" }}>Staff Scanner</div>
        <div className="muted" style={{ marginBottom: "1rem", fontWeight: "500" }}>Status: {status}</div>

        {err && <div className="alert" style={{ marginBottom: "1rem" }}>{err}</div>}

        {/* Scanner Container with CSS updates */}
        <div 
          id={readerId} 
          className="scannerBox" 
          style={{ 
            width: "100%", 
            maxWidth: "350px", 
            margin: "0 auto 1.5rem auto", 
            borderRadius: "12px", 
            overflow: "hidden", // Ensures the video doesn't bleed past rounded corners
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
          }} 
        />

        <div className="divider" style={{ margin: "1.5rem 0", borderBottom: "1px solid #eee" }} />

        <div className="muted small" style={{ marginBottom: "0.5rem" }}>
          Manual verify (paste QR text / ticketId)
        </div>
        <div className="row gap" style={{ display: "flex", gap: "0.5rem" }}>
          <input
            value={manual}
            onChange={(e) => setManual(e.target.value)}
            placeholder="ticketId or token"
            style={{ flex: 1, padding: "0.5rem 0.75rem", borderRadius: "6px", border: "1px solid #ccc" }}
          />
          <button 
            className="btn" 
            onClick={() => verify(manual)} 
            disabled={!manual.trim()}
            style={{ padding: "0.5rem 1rem", borderRadius: "6px" }}
          >
            Verify
          </button>
        </div>
      </div>

      <div className="card" style={{ padding: "1.5rem" }}>
        <div className="card-title" style={{ marginBottom: "1rem" }}>Last Result</div>

        {!lastResult ? (
          <div className="muted">No scans yet.</div>
        ) : (
          <div>
            <div 
              className={`result ${lastResult.ok ? "ok" : "bad"}`}
              style={{
                padding: "1rem",
                borderRadius: "8px",
                marginBottom: "1.5rem",
                backgroundColor: lastResult.ok ? "#e6ffe6" : "#ffe6e6",
                color: lastResult.ok ? "#006600" : "#cc0000",
                fontWeight: "bold"
              }}
            >
              {lastResult.ok ? "✅ " : "❌ "} {lastResult.message || "Result"}
            </div>

            <div className="stack" style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {lastResult.attendeeName && (
                <div><span className="muted" style={{ display: "inline-block", width: "70px" }}>Attendee:</span> <strong>{lastResult.attendeeName}</strong></div>
              )}
              {lastResult.eventTitle && (
                <div><span className="muted" style={{ display: "inline-block", width: "70px" }}>Event:</span> {lastResult.eventTitle}</div>
              )}
              {lastResult.ticketId && (
                <div><span className="muted" style={{ display: "inline-block", width: "70px" }}>Ticket:</span> <span className="mono">{lastResult.ticketId}</span></div>
              )}
              {lastResult.scannedAt && (
                <div><span className="muted" style={{ display: "inline-block", width: "70px" }}>Time:</span> {new Date(lastResult.scannedAt).toLocaleString()}</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}