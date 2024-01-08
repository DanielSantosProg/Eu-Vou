import React from "react";
import styles from "./Event.module.css";
import { Link, useParams } from "react-router-dom";
import { useFetchDocument } from "../../hooks/useFetchDocument";

const Event = () => {
  const { id } = useParams();
  const { document: event, loading, error } = useFetchDocument("events", id);

  if (loading) {
    return <p>Carregando informações...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!event) {
    return <p>Evento não encontrado.</p>;
  }

  const dateTime = new Date(event.eventDateTime);
  const date = dateTime.toLocaleDateString();
  const time = dateTime.toLocaleTimeString();

  return (
    <div className={styles.event_container}>
      <>
        <h2>{event.eventName}</h2>
        <img src={event.image} alt={event.eventName} />
        <p>
          <span>Descrição:</span>
          <br /> {event.description}
        </p>
        <p>
          <span>Data:</span> {date}
        </p>
        <p>
          <span>Horário:</span> {time}
        </p>
        <p>
          <span>Local:</span> {event.eventLocation}
        </p>
        <h3>Tags do evento:</h3>
        <div className={styles.tags}>
          {event.tagsArray.map((tag) => (
            <Link to={`/search?q=${tag}`} key={tag}>
              .{tag}
            </Link>
          ))}
        </div>
      </>
    </div>
  );
};

export default Event;
