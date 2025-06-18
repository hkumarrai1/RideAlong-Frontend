import { useState, useContext } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import modalStyles from "./Modal.module.css";
import SocialMedia from "./SocialMedia";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, resetPassword } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showReset, setShowReset] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetMsg, setResetMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    const response = await login(email, password);

    if (!response) {
      setError("Email not verified. Check your inbox.");
      return;
    }
    if (response.error) {
      setError(response.error);
      return;
    }
    navigate("/dashboard");
  }
  async function handleReset(e) {
    e.preventDefault();
    setResetMsg("");
    try {
      await resetPassword(resetEmail);
      setResetMsg("Reset link sent! Check your inbox.");
    } catch (err) {
      setResetMsg(err.message);
    }
  }

  return (
    <div className={styles.formWrapper}>
      <h2 className={styles.heading}>Login</h2>
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

        <button type="submit">Login</button>
        <p className={styles.forgotLink} onClick={() => setShowReset(true)}>
          Forgot Password?
        </p>
      </form>
      {/* Forgot Password Modal */}
      {showReset && (
        <div className={modalStyles.popupOverlay}>
          <div className={modalStyles.popup}>
            <button
              className={modalStyles.closeButton}
              aria-label="Close popup"
              onClick={() => setShowReset(false)}
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>

            <h3 className={modalStyles.popupTitle}>Reset Your Password</h3>
            <form onSubmit={handleReset}>
              <input
                type="email"
                placeholder="Enter your email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                required
                className={modalStyles.input}
              />
              <button type="submit" className={modalStyles.button}>
                Send Reset Link
              </button>
            </form>
            {resetMsg && <p className={modalStyles.resetMsg}>{resetMsg}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
