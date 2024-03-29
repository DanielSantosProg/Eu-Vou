import React from "react";
import { Link } from "react-router-dom";
import styles from "./EventDetail.module.css";
import { useState, useEffect } from "react";

const EventDetail = ({ event }) => {
  const [active, setActive] = useState(true);

  useEffect(() => {
    const dateTime = new Date(event.eventDateTime);
    const currDateTime = new Date();

    if (dateTime.getTime() < currDateTime.getTime()) {
      setActive(false);
    }
  }, [event.eventDateTime]);

  return (
    <div className={styles.event_detail}>
      <h2>{event.eventName}</h2>
      <img src={event.image} alt={event.eventName} />
      <div className={styles.buttonContainer}>
        <button className={active ? styles.btn_green : styles.btn_red}></button>
        <span className={styles.statusText}>
          {active ? "Ativo" : "Finalizado"}
        </span>
      </div>
      <div className={styles.tags}>
        <p className={styles.tag}>
          <span>TAGS:</span>
        </p>
        {event.tagsArray.map((tag) => (
          <p key={tag}>{tag}, </p>
        ))}
      </div>
      <Link to={`/events/${event.id}`} className="btn btn-outline">
        Ver Detalhes
      </Link>
    </div>
  );
};

export default EventDetail;
