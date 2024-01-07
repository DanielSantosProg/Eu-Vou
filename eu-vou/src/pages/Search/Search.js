import React from "react";
import styles from "./Search.module.css";
import { Link } from "react-router-dom";
import EventDetail from "../../components/EventDetail";

import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useQuery } from "../../hooks/useQuery";

const Search = () => {
  const query = useQuery();
  const search = query.get("q");

  const { documents: events } = useFetchDocuments("events", search);

  return (
    <div className={styles.search_container}>
      <h2>Search</h2>
      <p>
        {events && events.length === 0 && (
          <div className={styles.noposts}>
            <p>Não foram encontrados eventos com esses tags.</p>
            <Link to="/" className="btn btn-dark">
              Voltar
            </Link>
          </div>
        )}
        {events &&
          events.map((event) => <EventDetail key={event.id} event={event} />)}
      </p>
    </div>
  );
};

export default Search;
