import styles from "./EditEvent.module.css";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthValue } from "../../context/authContext";
import { useUpdateDocument } from "../../hooks/useUpdateDocument";
import { useFetchDocument } from "../../hooks/useFetchDocument";

const EditEvent = () => {
  const { id } = useParams();
  const { document: event, loading, error } = useFetchDocument("events", id);

  const [eventName, setEventName] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");
  const [eventDateTime, setEventDateTime] = useState("");

  useEffect(() => {
    if (event) {
      setEventName(event.eventName);
      setImage(event.image);
      setDescription(event.description);
      setEventLocation(event.eventLocation);
      setEventDateTime(event.eventDateTime);

      const textTags = event.tagsArray.join(", ");

      setTags(textTags);
    }
  }, [event]);

  const { user } = useAuthValue();
  const { updateDocument, response } = useUpdateDocument("events");
  const navigate = useNavigate();

  if (loading) {
    return <p>Carregando informações...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!event) {
    return <p>Evento não encontrado.</p>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    try {
      new URL(image);
    } catch (error) {
      setFormError("Forneça uma URL válida.");
    }

    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());

    if (
      !eventName ||
      !image ||
      !eventLocation ||
      !tags ||
      !description ||
      !eventDateTime
    ) {
      setFormError("Preencha todos os campos!");
    }

    if (formError) return;

    const data = {
      eventName,
      image,
      description,
      eventLocation,
      eventDateTime,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    };

    updateDocument(id, data);

    navigate("/dashboard");
  };

  return (
    <div className={styles.edit_event}>
      <h2>Editar evento: {event.eventName}</h2>
      <p>Mude o que desejar.</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Nome do evento:</span>
          <input
            type="text"
            name="eventName"
            required
            placeholder="Digite o nome do seu evento."
            onChange={(e) => setEventName(e.target.value)}
            value={eventName}
          />
        </label>
        <label>
          <span>URL da imagem:</span>
          <input
            type="text"
            name="image"
            placeholder="Insira a URL da imagem/banner do seu evento."
            onChange={(e) => setImage(e.target.value)}
            value={image}
          />
        </label>
        <p className={styles.preview_title}>Preview da imagem:</p>
        <img
          className={styles._image_preview}
          src={event.image}
          alt={event.eventName}
        />
        <label>
          <span>Descrição do evento:</span>
          <textarea
            name="description"
            required
            placeholder="Descreva o seu evento."
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          ></textarea>
        </label>
        <label>
          <span>Local do evento:</span>
          <input
            type="text"
            name="eventLocation"
            required
            placeholder="Descreva aonde irá acontecer o evento."
            onChange={(e) => setEventLocation(e.target.value)}
            value={eventLocation}
          />
        </label>
        <label>
          <span>Data e Hora do evento:</span>
          <input
            type="datetime-local"
            name="eventDateTime"
            required
            onChange={(e) => setEventDateTime(e.target.value)}
            value={eventDateTime}
          />
        </label>
        <label>
          <span>Tags:</span>
          <input
            type="text"
            name="tags"
            required
            placeholder="Insira as tags do seu evento, separadas por vírgula."
            onChange={(e) => setTags(e.target.value)}
            value={tags}
          />
        </label>
        {!response.loading && <button className="btn">Editar</button>}
        {response.loading && (
          <button className="btn" disabled>
            Aguarde...
          </button>
        )}
        {response.error && <p className="error">{response.error}</p>}
        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
};

export default EditEvent;
