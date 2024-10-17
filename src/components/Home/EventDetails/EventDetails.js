import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; 
import axios from "axios";

export default function EventDetails() {
  const { id } = useParams(); 
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/fetch-event/${id}`);
        const data = response.data;

        if (data.status === "ok") {
          setEvent(data.data);
        } else {
          setError("Failed to fetch event details.");
        }
      } catch (error) {
        console.error("Error fetching event details:", error);
        setError("An error occurred while fetching event details.");
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [id]);

  if (loading) {
    return <p>Loading event details...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!event) {
    return <p>No event details found.</p>;
  }

  const imageSrc = event.eventImage ? `/documents/${event.eventImage}` : null;

  return (
    <div className="container">
      <h2>{event.title}</h2>
      <p>{event.description}</p>
      <p>
        <strong>Date: </strong>
        {new Date(event.eventDate).toLocaleDateString()}
      </p>
      <p>
        <strong>Location: </strong>
        {event.location}
      </p>
      <p>
        <strong>Category: </strong>
        {event.category}
      </p>
      <p>
        <strong>Organizer: </strong>
        {event.organizerName}
      </p>
      <p>
        <strong>Contact: </strong>
        {event.organizerContact}
      </p>


      {imageSrc ? (
        <div>
          <strong>Event Image:</strong>
          <img src={imageSrc} alt="Event" style={{ maxWidth: "100%", height: "auto" }} />
        </div>
      ) : (
        <p>No image available for this event.</p>
      )}
    </div>
  );
}
