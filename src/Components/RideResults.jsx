import styles from "./RideResults.module.css";

const RideResults = ({ options }) => {
  if (!options || options.length === 0) {
    return null;
  }
  return (
    <div className={styles.rideResultsContainer}>
      <h3 className={styles.title}>Available Rides</h3>
      <div className={styles.rideList}>
        {options.map((ride, idx) => (
          <div className={styles.rideCard} key={ride.type + idx}>
            <div className={styles.rideType}>{ride.type}</div>
            <div className={styles.rideAvatar}>
              <img
                src={ride.avatar || "/vite.svg"}
                alt={ride.type}
                className={styles.avatarImg}
              />
            </div>
            <div className={styles.rideFare}>₹{ride.fare.toFixed(0)}</div>
            <button className={styles.bookBtn} disabled>
              Book (Coming Soon)
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RideResults;
