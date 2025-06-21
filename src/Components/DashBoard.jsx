import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate, Outlet, Link } from "react-router-dom";
import LiveLocationMap from "./LiveLocationMap";
import NormalRide from "./NormalRide";
import ProfileForm from "./ProfileForm";
import axiosInstance from "./axiosInstance";
import styles from "./DashBoard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import RideResults from "./RideResults";

function Dashboard() {
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [profileComplete, setProfileComplete] = useState(true); // default true for existing users
  const [profileChecked, setProfileChecked] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showOutlet, setShowOutlet] = useState(false);
  const [rideOptions, setRideOptions] = useState([]);

  useEffect(() => {
    async function checkProfile() {
      if (!currentUser) return;
      try {
        const res = await axiosInstance.get(
          `/user/profile-status?firebaseUID=${currentUser.uid}`
        );
        setProfileComplete(res.data.profileComplete);
      } catch {
        setProfileComplete(false);
      } finally {
        setProfileChecked(true);
      }
    }
    checkProfile();
  }, [currentUser]);

  // Listen for route changes to show/hide Outlet
  useEffect(() => {
    // If the current path is /dashboard or /dashboard/, hide Outlet
    // If it's a nested route, show Outlet
    const path = window.location.pathname;
    if (path === "/dashboard" || path === "/dashboard/") {
      setShowOutlet(false);
    } else if (path.startsWith("/dashboard/")) {
      setShowOutlet(true);
    }
    // Listen for popstate (back/forward navigation)
    const onPop = () => {
      const path = window.location.pathname;
      if (path === "/dashboard" || path === "/dashboard/") {
        setShowOutlet(false);
      } else if (path.startsWith("/dashboard/")) {
        setShowOutlet(true);
      }
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  async function handleLogout() {
    await logout();
    navigate("/");
  }

  async function handleProfileSubmit(profileData) {
    try {
      await axiosInstance.put("/user/profile", profileData);
      setProfileComplete(true);
    } catch (err) {
      alert("Failed to save profile. Try again.");
    }
  }

  if (!profileChecked) return null;
  if (!profileComplete) {
    return (
      <ProfileForm
        email={currentUser.email}
        firebaseUID={currentUser.uid}
        onSubmit={handleProfileSubmit}
      />
    );
  }

  return (
    <div className={styles.dashboardContainer}>
      {/* Account/Profile Icon at top right */}
      <div style={{ position: "absolute", top: 18, right: 24, zIndex: 100 }}>
        <button
          style={{
            background: "#fff",
            border: "none",
            borderRadius: "50%",
            width: 40,
            height: 40,
            boxShadow: "0 2px 8px rgba(33,147,176,0.10)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Account menu"
        >
          <FontAwesomeIcon icon={faUserCircle} size="2x" color="#2193b0" />
        </button>
        {menuOpen && (
          <div
            style={{
              position: "absolute",
              top: 48,
              right: 0,
              background: "#fff",
              borderRadius: 12,
              boxShadow: "0 4px 16px rgba(33,147,176,0.13)",
              minWidth: 180,
              padding: 0,
              zIndex: 200,
            }}
          >
            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
              <li>
                <Link
                  to="profile"
                  style={menuLinkStyle}
                  onClick={() => {
                    setMenuOpen(false);
                    setShowOutlet(true);
                  }}
                >
                  Profile Settings
                </Link>
              </li>
              <li>
                <Link
                  to="faqs"
                  style={menuLinkStyle}
                  onClick={() => {
                    setMenuOpen(false);
                    setShowOutlet(true);
                  }}
                >
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  to="driver-registration"
                  style={menuLinkStyle}
                  onClick={() => {
                    setMenuOpen(false);
                    setShowOutlet(true);
                  }}
                >
                  Driver Registration
                </Link>
              </li>
              <li>
                <Link
                  to="refer"
                  style={menuLinkStyle}
                  onClick={() => {
                    setMenuOpen(false);
                    setShowOutlet(true);
                  }}
                >
                  Refer & Earn
                </Link>
              </li>
              <li>
                <Link
                  to="earnings"
                  style={menuLinkStyle}
                  onClick={() => {
                    setMenuOpen(false);
                    setShowOutlet(true);
                  }}
                >
                  My Earnings
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
      {/* Only show map and normal ride if not in Outlet mode */}
      {!showOutlet && (
        <div style={{ width: "100%" }}>
          <div className={styles.dashboardContent}>
            <div className={styles.dashboardLeft}>
              <h2 className={styles.dashboardTitle}>
                Welcome, {currentUser?.email}!
              </h2>
              <button onClick={handleLogout} className={styles.dashboardLogout}>
                Logout
              </button>
              <NormalRide setRideOptions={setRideOptions} />
            </div>
            <div className={styles.dashboardRight}>
              <LiveLocationMap />
            </div>
          </div>
          {/* RideResults centered below the two columns */}
          {rideOptions && rideOptions.length > 0 && (
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <RideResults options={rideOptions} />
            </div>
          )}
        </div>
      )}
      {/* Outlet for account section, full width */}
      {showOutlet && (
        <div
          style={{
            width: "100vw",
            minHeight: 320,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Outlet />
        </div>
      )}
    </div>
  );
}

const menuLinkStyle = {
  display: "block",
  padding: "12px 18px",
  color: "#2193b0",
  textDecoration: "none",
  fontWeight: 500,
  borderBottom: "1px solid #f0f0f0",
  fontSize: "1rem",
};

export default Dashboard;
