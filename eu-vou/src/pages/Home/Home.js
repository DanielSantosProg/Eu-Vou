import styles from "./Home.module.css";

import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import EventDetail from "../../components/EventDetail";

const Home = () => {
  const [query, setQuery] = useState("");
  const { documents: events, loading } = useFetchDocuments("events");

  const navigate = useNavigate();

  console.log(events);
  const handleSubmit = (e) => {
    e.preventDefault();

    if (query) {
      return navigate(`/search?q=${query}`);
    }
  };

  return (
    <div className={styles.home}>
      <h2>
        Crie um evento <span>OU</span> Procure no nosso site
      </h2>
      <div className={styles.top_container}>
        <Link to="/events/create" className="btn btn-outline">
          Criar Evento
        </Link>
        <p>/</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Digite uma tag"
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="btn">Pesquisar</button>
        </form>
      </div>

      <div>
        {loading && <p>Carregando...</p>}
        <h3>Confira os eventos mais recentes</h3>
        {events &&
          events.map((event) => <EventDetail key={event.id} event={event} />)}
        {events && events.length === 0 && (
          <div className={styles.noevents}>
            <p>Não existem Eventos cadastrados</p>
            <Link to="/events/create" className="btn">
              Criar Evento
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
