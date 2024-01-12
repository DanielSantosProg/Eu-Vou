import styles from "./Dashboard.module.css";

import { Link } from "react-router-dom";

import { useAuthValue } from "../../context/authContext";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useDeleteDocument } from "../../hooks/useDeleteDocument";
import { useState } from "react";

const Dashboard = () => {
  const { user } = useAuthValue();
  const uid = user.id;
  const [eventsActive, setEventsActive] = useState(false);
  const [subsActive, setSubsActive] = useState(true);

  const { documents: events, loading } = useFetchDocuments("events", null, uid);
  const { documents: subs, loading: subsLoading } = useFetchDocuments(
    "userGoingTo",
    null,
    uid
  );

  const { deleteDocument } = useDeleteDocument("events");
  const { deleteSub } = useDeleteDocument("userGoingTo");

  function toggleEvents() {
    setEventsActive(true);
    setSubsActive(false);
  }

  function toggleSubs() {
    setSubsActive(true);
    setEventsActive(false);
  }

  if (loading || subsLoading) {
    return <p>Carregando...</p>;
  }

  return (
    <div className={styles.dashboard}>
      <h2>Dashboard</h2>
      <p>Veja e edite seus eventos</p>

      <div className={styles.menuButtons}>
        <button
          className={`btn ${eventsActive ? "" : styles.inactiveButton}`}
          onClick={toggleEvents}
        >
          Meus Eventos
        </button>
        <button
          className={`btn ${subsActive ? "" : styles.inactiveButton}`}
          onClick={toggleSubs}
        >
          Eventos inscritos
        </button>
      </div>
      <div className={styles.event_header}>
        <span>Título</span>
        <span>Ações</span>
      </div>

      {!subs ? (
        <div className={styles.noevents}>
          <p>Não encontramos eventos.</p>
          <Link to="/events/create" className="btn">
            Crie seu próprio Evento
          </Link>
        </div>
      ) : (
        <>
          {subs && subsActive
            ? subs &&
              subs.map((sub) => (
                <div key={sub.id} className={styles.event_row}>
                  <p>{sub.id}</p>
                  <div>
                    <button
                      onClick={() => deleteDocument(sub.id)}
                      className="btn btn-outline btn-danger"
                    >
                      Excluir
                    </button>
                  </div>
                </div>
              ))
            : events &&
              events.map((event) => (
                <div key={event.id} className={styles.event_row}>
                  <p>{event.eventName}</p>
                  <div>
                    <Link
                      to={`/events/${event.id}`}
                      className="btn btn-outline"
                    >
                      Ver
                    </Link>
                    <Link
                      to={`/events/edit/${event.id}`}
                      className="btn btn-outline"
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() => deleteDocument(event.id)}
                      className="btn btn-outline btn-danger"
                    >
                      Excluir
                    </button>
                  </div>
                </div>
              ))}
        </>
      )}
    </div>
  );
};

export default Dashboard;
