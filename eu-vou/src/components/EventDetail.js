import React from "react";
import { Link } from "react-router-dom";
import styles from "./EventDetail.module.css";

const EventDetail = ({ event }) => {
  // Extracting seconds and nanoseconds from createdAt
  const { seconds, nanoseconds } = event.createdAt;

  return (
    <div>
      <img src={event.image} alt={event.eventName} />
      <h2>{event.eventName}</h2>
      {/* Rendering the extracted values */}
      <div>
        {event.tagsArray.map((tag) => (
          <p key={tag}>{tag}</p>
        ))}
      </div>
      <Link to={`/events/${event.id}`} className="btn btn-outline">
        View Details
      </Link>
    </div>
  );
};

export default EventDetail;
