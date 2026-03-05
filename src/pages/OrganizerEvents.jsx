import React, { useEffect, useState } from "react";
// import { EventsAPI } from "../api/endpoints"; // Commented out until backend is ready

export default function OrganizerEvents() {
  // Main state
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  // Create Form State
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [venue, setVenue] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [capacity, setCapacity] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Edit Mode State
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ title: "", description: "", venue: "", dateTime: "", capacity: "" });

  // MOCKED LOAD FUNCTION
  async function load() {
    setLoading(true);
    setErr("");
    
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }

  useEffect(() => { load(); }, []);

  // MOCKED CREATE FUNCTION
  async function createEvent(e) {
    e.preventDefault();
    setErr("");
    setIsSubmitting(true);

    const newEvent = {
      _id: Math.random().toString(36).substr(2, 9),
      title,
      description,
      venue,
      dateTime: dateTime ? new Date(dateTime).toISOString() : null,
      capacity: capacity ? Number(capacity) : null,
    };

    setTimeout(() => {
      setEvents((prevEvents) => [newEvent, ...prevEvents]);
      setTitle(""); setDescription(""); setVenue(""); setDateTime(""); setCapacity("");
      setIsSubmitting(false);
    }, 600);
  }

  // --- NEW: MANAGE / EDIT FUNCTIONS ---

  // Helper to convert ISO date back to the YYYY-MM-DDTHH:mm format required by <input type="datetime-local">
  function formatForInput(isoString) {
    if (!isoString) return "";
    const d = new Date(isoString);
    const pad = (n) => n.toString().padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
  }

  function startEditing(event) {
    setEditingId(event._id);
    setEditForm({
      title: event.title || "",
      description: event.description || "",
      venue: event.venue || "",
      dateTime: formatForInput(event.dateTime),
      capacity: event.capacity || ""
    });
  }

  function saveEdit(e) {
    e.preventDefault();
    const updatedEvent = {
      ...editForm,
      _id: editingId,
      dateTime: editForm.dateTime ? new Date(editForm.dateTime).toISOString() : null,
      capacity: editForm.capacity ? Number(editForm.capacity) : null,
    };

    // Update the event in our state array
    setEvents(events.map(ev => ev._id === editingId ? updatedEvent : ev));
    setEditingId(null); // Close edit mode
  }

  function cancelEvent(id) {
    if (window.confirm("Are you sure you want to completely cancel and delete this event? This action cannot be undone.")) {
      setEvents(events.filter(ev => ev._id !== id));
      setEditingId(null);
    }
  }

  // Helper to format date nicely for the UI cards
  function formatDate(d) {
    if (!d) return "TBD";
    try {
      const dateObj = new Date(d);
      return dateObj.toLocaleDateString('en-US', {
        weekday: 'short', month: 'short', day: 'numeric',
        hour: 'numeric', minute: '2-digit'
      });
    } catch {
      return d;
    }
  }

  return (
    <div className="container" style={{ paddingTop: "20px" }}>
      
      {/* HEADER SECTION */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
        <div>
          <h1 style={{ margin: 0, fontSize: "2.5rem" }}>Organizer Dashboard</h1>
          <p className="muted" style={{ margin: 0 }}>Manage and create your events here.</p>
        </div>
        <button className="btn btn-outline" onClick={load} disabled={loading}>
          {loading ? "Refreshing..." : "Refresh Events"}
        </button>
      </div>

      {err && <div className="alert"><span>⚠️</span> {err}</div>}

      {/* TWO COLUMN LAYOUT */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "32px", alignItems: "start" }}>
        
        {/* COLUMN 1: CREATE FORM */}
        <div className="card" style={{ padding: "32px" }}>
          <div className="card-title" style={{ fontSize: "1.5rem" }}>Create New Event</div>
          
          <form onSubmit={createEvent} className="form" style={{ marginTop: "24px" }}>
            <label>
              Event Title
              <input value={title} onChange={(e) => setTitle(e.target.value)} required />
            </label>

            <label>
              Description
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} />
            </label>

            <label>
              Venue / Location
              <input value={venue} onChange={(e) => setVenue(e.target.value)} />
            </label>

            <label>
              Date & Time
              <input type="datetime-local" value={dateTime} onChange={(e) => setDateTime(e.target.value)} />
            </label>

            <label>
              Maximum Capacity
              <input type="number" min="1" value={capacity} onChange={(e) => setCapacity(e.target.value)} placeholder="Leave blank for unlimited" />
            </label>

            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Event"}
            </button>
          </form>
        </div>

        {/* COLUMN 2: EVENT LIST */}
        <div className="stack" style={{ gap: "20px" }}>
          {loading ? (
            <div className="card" style={{ padding: "40px", color: "var(--muted)", textAlign: "center" }}>
              Loading events...
            </div>
          ) : events.length === 0 ? (
            <div className="card" style={{ padding: "60px", color: "var(--muted)", textAlign: "center", borderStyle: "dashed" }}>
              <h3>No events yet</h3>
            </div>
          ) : (
            events.map((e) => (
              <div className="card" key={e._id} style={{ padding: "24px" }}>
                
                {/* CHECK IF IN EDIT MODE */}
                {editingId === e._id ? (
                  <form onSubmit={saveEdit} className="form" style={{ gap: "16px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <h3 style={{ margin: 0, color: "var(--primary)" }}>Editing Event</h3>
                      <button type="button" className="btn btn-danger small-btn" onClick={() => cancelEvent(e._id)}>
                        Cancel Event (Delete)
                      </button>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                      <label>
                        Title
                        <input required value={editForm.title} onChange={(ev) => setEditForm({...editForm, title: ev.target.value})} />
                      </label>
                      <label>
                        Venue
                        <input value={editForm.venue} onChange={(ev) => setEditForm({...editForm, venue: ev.target.value})} />
                      </label>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                      <label>
                        Date & Time
                        <input type="datetime-local" value={editForm.dateTime} onChange={(ev) => setEditForm({...editForm, dateTime: ev.target.value})} />
                      </label>
                      <label>
                        Capacity
                        <input type="number" min="1" value={editForm.capacity} onChange={(ev) => setEditForm({...editForm, capacity: ev.target.value})} />
                      </label>
                    </div>

                    <label>
                      Description
                      <textarea rows={2} value={editForm.description} onChange={(ev) => setEditForm({...editForm, description: ev.target.value})} />
                    </label>

                    <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
                      <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Save Changes</button>
                      <button type="button" className="btn btn-outline" style={{ flex: 1 }} onClick={() => setEditingId(null)}>Discard Edits</button>
                    </div>
                  </form>
                ) : (
                  /* NORMAL DISPLAY MODE */
                  <>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <div>
                        <h3 style={{ margin: "0 0 8px 0", fontSize: "1.4rem" }}>{e.title}</h3>
                        <p className="muted" style={{ margin: "0 0 16px 0", fontSize: "1rem" }}>{e.description || "No description provided."}</p>
                      </div>
                      <button className="btn btn-outline small-btn" onClick={() => startEditing(e)}>Manage</button>
                    </div>
                    
                    <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                      <span className="user-badge" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        📍 {e.venue || "TBD"}
                      </span>
                      <span className="user-badge" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        🗓️ {formatDate(e.dateTime)}
                      </span>
                      <span className="user-badge" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        👥 {e.capacity ? `${e.capacity} max` : "Unlimited"}
                      </span>
                    </div>
                  </>
                )}
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}