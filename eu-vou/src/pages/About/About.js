import { Link } from "react-router-dom";
import styles from "./About.module.css";

const About = () => {
  return (
    <div className={styles.about}>
      <h2>
        Sobre o <span>EU</span> VOU!{" "}
      </h2>
      <p>
        O EU VOU! é um projeto que busca dar uma plataforma de criação e busca
        de diferentes tipos de eventos pelo país.
      </p>
      <Link to="/" className="btn">
        Achar Eventos
      </Link>
    </div>
  );
};

export default About;
