import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; 

export default function EventList() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:5000/fetch-event");
        const data = await response.json();

        if (data.status === "ok") {
          setEvents(data.data);
        } else {
          setError("Failed to fetch events.");
        }
      } catch (error) {
        console.error("Error fetching events:", error);
        setError("An error occurred while fetching events.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return <p>Loading events...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="container">
      <h2>Event List</h2>
      <div className="row">
        {events.length === 0 ? (
          <p>No events available</p>
        ) : (
          events.map((event) => (
            <div className="col-md-4 mb-4" key={event._id}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{event.title}</h5>
                  <p className="card-text">{event.description}</p>
                  <p>
                    <strong>Date: </strong>
                    {new Date(event.eventDate).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Location: </strong>
                    {event.location}
                  </p>
                  <Link to={`/event-details/${event._id}`} className="btn btn-primary">
                    Show More
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
