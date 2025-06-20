import { useState } from "react";
import styles from "./ProfileForm.module.css";

const ProfileForm = ({ email, firebaseUID, onSubmit }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !phone || !role) {
      setError("All fields are required");
      return;
    }
    setError("");
    await onSubmit({ firebaseUID, name, phone, role });
  };

  return (
    <form className={styles.profileForm} onSubmit={handleSubmit}>
      <h2 className={styles.title}>Complete Your Profile</h2>
      <div className={styles.inputGroup}>
        <label>Email</label>
        <input type="email" value={email} readOnly />
      </div>
      <div className={styles.inputGroup}>
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className={styles.inputGroup}>
        <label>Phone</label>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </div>
      <div className={styles.inputGroup}>
        <label>Role</label>
        <select value={role} onChange={(e) => setRole(e.target.value)} required>
          <option value="">Select Role</option>
          <option value="Passenger">Passenger</option>
          <option value="Driver">Driver</option>
        </select>
      </div>
      {error && <div className={styles.error}>{error}</div>}
      <button type="submit" className={styles.submitBtn}>
        Save Profile
      </button>
    </form>
  );
};

export default ProfileForm;
