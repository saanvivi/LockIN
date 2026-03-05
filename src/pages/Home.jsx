import React, { useEffect, useState } from "react";
import { EventsAPI } from "../api/endpoints";
import EventCard from "../components/EventCard";
import { useNavigate } from "react-router-dom";

export default function Home() {
  // 1. Hook MUST be inside the component
  const [events, setEvents] = useState([
    {
      _id: "test", 
      title: "FSD Class",
      venue: "AB5 203",
      dateTime: "2026-05-20T10:00:00",
      description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit."
    }
  ]);
  
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await EventsAPI.list();
        const fetchedEvents = res.data?.events || res.data || [];
        
        // 2. Only overwrite if the API actually has data
        if (fetchedEvents.length > 0) {
          setEvents(fetchedEvents);
        }
      } catch (e) {
        console.error("Failed to fetch events", e);
        // On error, we keep the dummy event so the UI doesn't look broken
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  return (
    <div className="home-container">
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Seamless Access to <span className="text-gradient">Every Event.</span></h1>
          <p className="hero-subtitle">
            Experience the future of smart event management. Secure your spot, 
            get your unique QR ticket, and walk right in.
          </p>
          <div className="hero-actions">
            <button className="btn btn-primary" onClick={() => {
              document.getElementById('events-section').scrollIntoView({ behavior: 'smooth' });
            }}>
              Browse Events
            </button>
            <button className="btn btn-outline" onClick={() => nav("/login")}>
              For Organizers
            </button>
          </div>
        </div>
      </section>

      <div className="container" id="events-section">
        <div className="section-header">
          <h2 className="card-title">Upcoming Events</h2>
          <div className="divider-sm" />
        </div>

        {loading ? (
          <div className="muted center" style={{ padding: "40px" }}>Loading events...</div>
        ) : events.length === 0 ? (
          <div className="alert" style={{ justifyContent: 'center' }}>
            No events found. Check back later!
          </div>
        ) : (
          <div className="grid">
            {events.map((ev) => (
              <EventCard key={ev._id} event={ev} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}