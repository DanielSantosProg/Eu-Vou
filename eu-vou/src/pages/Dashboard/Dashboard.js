import styles from "./Dashboard.module.css";

import { Link } from "react-router-dom";

import { useAuthValue } from "../../context/authContext";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useDeleteDocument } from "../../hooks/useDeleteDocument";

const Dashboard = () => {
  const { user } = useAuthValue();
  const uid = user.id;

  const { documents: events, loading } = useFetchDocuments("events", null, uid);

  const { deleteDocument } = useDeleteDocument("events");

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div className={styles.dashboard}>
      <h2>Dashboard</h2>
      <p>Veja e edite seus eventos</p>
      {events && events.length === 0 ? (
        <div className={styles.noevents}>
          <p>Não encontramos eventos.</p>
          <Link to="/events/create" className="btn">
            Criar Evento
          </Link>
        </div>
      ) : (
        <>
          <div className={styles.event_header}>
            <span>Título</span>
            <span>Ações</span>
          </div>

          {events &&
            events.map((event) => (
              <div key={event.id} className={styles.event_row}>
                <p>{event.eventName}</p>
                <div>
                  <Link to={`/events/${event.id}`} className="btn btn-outline">
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
