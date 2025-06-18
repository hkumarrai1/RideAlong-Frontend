import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import styles from "./Login.module.css";

const SocialMedia = () => {
  const { googleLogin, facebookLogin, user } = useContext(AuthContext);

  return (
    <div className={styles.socialMediaContainer}>
      <p className={styles.socialMediaTitle}>Or sign in with</p>
      <div className={styles.socialMediaButtons}>
        <button
          type="button"
          className={styles.socialMediaBtn}
          onClick={googleLogin}
          aria-label="Sign in with Google"
        >
          <i className="fab fa-google"></i>
        </button>
        <button
          type="button"
          className={styles.socialMediaBtn}
          onClick={facebookLogin}
          aria-label="Sign in with Facebook"
        >
          <i className="fab fa-facebook-f"></i>
        </button>
      </div>
    </div>
  );
};

export default SocialMedia;
