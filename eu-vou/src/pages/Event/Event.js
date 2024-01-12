import React, { useEffect } from "react";
import styles from "./Event.module.css";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useFetchDocument } from "../../hooks/useFetchDocument";
import { useFetchSub } from "../../hooks/useFetchSub";
import { useInsertDocument } from "../../hooks/useInsertDocument";
import { useAuthValue } from "../../context/authContext";

const Event = () => {
  console.log("Component re-rendered");
  const { id } = useParams();
  const { user } = useAuthValue();
  const [buttonClicked, setButtonClicked] = useState(false);

  const {
    document: event,
    loading: eventLoading,
    error: eventError,
  } = useFetchDocument("events", id);

  const {
    document: userSubbed,
    loading: userLoading,
    error: userError,
  } = useFetchSub("userGoingTo", user.uid, id);

  const { insertDocument, response } = useInsertDocument("userGoingTo");

  const dateTime = event ? new Date(event.eventDateTime) : null;
  const date = dateTime ? dateTime.toLocaleDateString() : null;
  const time = dateTime ? dateTime.toLocaleTimeString() : null;

  function subToEvent() {
    if (!userSubbed) {
      insertDocument({
        uid: user.uid,
        eventId: id,
      });
      setButtonClicked(true);
    } else {
      console.log("Already subbed!");
    }
  }

  return (
    <div className={styles.event_container}>
      {eventLoading || userLoading ? (
        <p>Loading...</p>
      ) : eventError || userError ? (
        <p>Erro Carregando os dados.</p>
      ) : (
        <>
          <h2>{event.eventName}</h2>
          <img src={event.image} alt={event.eventName} />
          {userSubbed ? (
            <button className={`btn ${styles.subbed}`} disabled>
              Inscrito
            </button>
          ) : (
            <button
              className={`btn ${styles.notSubbed}`}
              onClick={subToEvent}
              disabled={buttonClicked}
            >
              Inscrever
            </button>
          )}
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
      )}
    </div>
  );
};

export default Event;
