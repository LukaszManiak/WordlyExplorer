import styles from "./Navbar.module.css";

export default function Navbar({ isDarkMode, onModeChange }) {
  return (
    <nav
      className={
        !isDarkMode
          ? `${styles.nav} ${styles["bright-mode"]}`
          : `${styles.nav} ${styles["dark-mode"]}`
      }
    >
      <h1>Where in the world?</h1>

      <div>
        <button
          className={
            !isDarkMode
              ? `${styles["dark-mode-button"]} ${styles["bright-mode"]}`
              : `${styles["dark-mode-button"]} ${styles["dark-mode"]}`
          }
          onClick={() => onModeChange()}
        >
          {!isDarkMode ? "🌕" : "🌚"} Dark Mode
        </button>
      </div>
    </nav>
  );
}
