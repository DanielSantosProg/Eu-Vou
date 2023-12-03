import styles from "./Register.module.css";
import { useState, useEffect } from "react";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");

    const user = {
      userName,
      userEmail,
      password,
    };

    if (password !== confirmPassword) {
      setError("As Senhas foram diferentes!");
      return;
    }

    console.log(user);
  };

  return (
    <div className={styles.register}>
      <h1>
        Cadastre-se no <span>EU</span> VOU!
      </h1>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Email:</span>
          <input
            type="email"
            name="userEmail"
            required
            placeholder="Digite seu Email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
          />
          <span>Nome:</span>
          <input
            type="text"
            name="userName"
            required
            placeholder="Digite seu nome"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <span>Senha:</span>
          <input
            type="password"
            name="password"
            required
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span>Confirme sua Senha:</span>
          <input
            type="password"
            name="confirmPassword"
            required
            placeholder="Digite novamente a senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button className="btn">Cadastrar</button>
          {error && <p className="error">{error}</p>}
        </label>
      </form>
    </div>
  );
};

export default Register;
