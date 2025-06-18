import { useState } from "react";
import Login from "./Login";
import SignUp from "./SignUp";
import styles from "./Auth.module.css";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className={styles.bg}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>RideAlong</h1>
          <p className={styles.motto}>Your Journey, Our Passion 🚗❤️</p>
        </div>

        <div
          className={`${styles.formContainer} ${
            isLogin ? styles.showLogin : styles.showSignUp
          }`}
        >
          {isLogin ? <Login /> : <SignUp />}
        </div>

        <button
          className={styles.toggleButton}
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "Go to Sign Up" : "Go to Login"}
        </button>
      </div>
    </div>
  );
};

export default Auth;
