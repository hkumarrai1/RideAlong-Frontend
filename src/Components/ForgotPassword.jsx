import { useState } from "react";
import styles from "./Login.module.css";

const ForgotPassword = ({ onSubmit, onCancel }) => {
  const [email, setEmail] = useState("");
  return (
    <form
      className={styles.forgotPasswordForm}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(email);
      }}
      style={{ minWidth: 180, maxWidth: 260, padding: 0 }}
    >
      <div className={styles.forgotPasswordTitle}>Forgot Password</div>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        required
        className={styles.forgotPasswordInput}
      />
      <div className={styles.forgotPasswordActions}>
        <button type="submit" className={styles.popupCloseBtn}>
          Send Link
        </button>
        <button
          type="button"
          className={styles.popupCloseBtn}
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ForgotPassword;
