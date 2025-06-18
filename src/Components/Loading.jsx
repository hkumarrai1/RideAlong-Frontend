import React from "react";
import styles from "./Loading.module.css";

const Loading = ({ type = "dots" }) => {
  return (
    <div className={styles.loadingContainer}>
      {type === "dots" ? (
        <div className={styles.dotsSpinner}>
          <div className={styles.dot}></div>
          <div className={styles.dot}></div>
          <div className={styles.dot}></div>
        </div>
      ) : (
        <div className={styles.circleSpinner}></div>
      )}
    </div>
  );
};

export default Loading;
