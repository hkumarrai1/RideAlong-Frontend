import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import LiveLocationMap from "./LiveLocationMap";
import NormalRide from "./NormalRide";
import styles from "./DashBoard.module.css";

function Dashboard() {
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate("/");
  }

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.dashboardLeft}>
        <h2 className={styles.dashboardTitle}>
          Welcome, {currentUser?.email}!
        </h2>
        <button onClick={handleLogout} className={styles.dashboardLogout}>
          Logout
        </button>
        <NormalRide />
      </div>
      <div className={styles.dashboardRight}>
        <LiveLocationMap />
      </div>
    </div>
  );
}

export default Dashboard;
