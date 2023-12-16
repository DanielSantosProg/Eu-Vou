import styles from "./Home.module.css";

import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import EventDetail from "../../components/EventDetail";

const Home = () => {
  const [query, setQuery] = useState("");
  const { documents: events, loading } = useFetchDocuments("events");
  console.log(events);
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className={styles.home}>
      <h2>Confira nossos Eventos</h2>
      <form onSubmit={handleSubmit} className={styles.search_form}>
        <input
          type="text"
          placeholder="Busque por tags"
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn">Pesquisar</button>
      </form>
      <div>
        {loading && <p>Carregando...</p>}
        {events &&
          events.map((event) => <EventDetail key={event.id} event={event} />)}
        {events && events.length === 0 && (
          <div className={styles.noevents}>
            <p>Não existem Eventos cadastrados</p>
            <Link to="/posts/create" className="btn">
              Criar Evento
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
