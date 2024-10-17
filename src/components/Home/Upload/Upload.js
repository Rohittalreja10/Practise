import React, { useState } from "react";

export default function EventForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [organizerName, setOrganizerName] = useState("");
  const [organizerContact, setOrganizerContact] = useState("");
  const [eventImage, setEventImage] = useState(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    
    formData.append("title", title);
    formData.append("description", description);
    formData.append("eventDate", eventDate);
    formData.append("location", location);
    formData.append("category", category);
    formData.append("organizerName", organizerName);
    formData.append("organizerContact", organizerContact);
    if (eventImage) {
      formData.append("image", eventImage);
    }

    try {
      const response = await fetch("http://localhost:5000/upload-event", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (data.status === "ok") {
        setMessage("Event created successfully!");
      } else {
        setMessage("Error creating event: " + data.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);

    }
  };

  return (
    <div className="container">
      <h2>Create Event</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="eventDate" className="form-label">
            Event Date
          </label>
          <input
            type="date"
            className="form-control"
            id="eventDate"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="location" className="form-label">
            Location
          </label>
          <input
            type="text"
            className="form-control"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <select
            className="form-control"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select Category</option>
            <option value="Workshop">Workshop</option>
            <option value="Conference">Conference</option>
            <option value="Meetup">Meetup</option>
            <option value="Webinar">Webinar</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="organizerName" className="form-label">
            Organizer Name
          </label>
          <input
            type="text"
            className="form-control"
            id="organizerName"
            value={organizerName}
            onChange={(e) => setOrganizerName(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="organizerContact" className="form-label">
            Organizer Contact
          </label>
          <input
            type="text"
            className="form-control"
            id="organizerContact"
            value={organizerContact}
            onChange={(e) => setOrganizerContact(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="eventImage" className="form-label">
            Upload Event Image
          </label>
          <input
            type="file"
            className="form-control"
            id="eventImage"
            onChange={(e) => setEventImage(e.target.files[0])}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Create Event
        </button>
      </form>
    </div>
  );
}
