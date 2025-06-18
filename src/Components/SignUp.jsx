import { useState, useContext } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css"; // Using same CSS as Login
import SocialMedia from "./SocialMedia";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { signUp } = useContext(AuthContext);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    const response = await signUp(email, password);

    if (response.error) {
      setError(response.error);
    } else {
      navigate("/dashboard");
    }
  }

  return (
    <div className={styles.formWrapper}>
      <h2 className={styles.heading}>Sign Up</h2>
      <SocialMedia />

      {error && <p className={styles.error}>{error}</p>}

      <form className={styles.form} onSubmit={handleSubmit}>
        <div
          className={styles.inputGroup}
          style={{
            display: "flex",
            alignItems: "center",
            position: "relative",
          }}
        >
          <i
            className={`fas fa-envelope ${styles.icon}`}
            style={{ position: "static", marginRight: "12px" }}
          ></i>
          <div style={{ flex: 1, position: "relative" }}>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder=" "
            />
            <label>Email</label>
          </div>
        </div>

        <div
          className={styles.inputGroup}
          style={{
            display: "flex",
            alignItems: "center",
            position: "relative",
          }}
        >
          <i
            className={`fas fa-lock ${styles.icon}`}
            style={{ position: "static", marginRight: "12px" }}
          ></i>
          <div style={{ flex: 1, position: "relative" }}>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder=" "
            />
            <label>Password</label>
          </div>
        </div>

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
