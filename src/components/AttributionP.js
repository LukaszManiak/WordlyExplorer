import styles from "./AttributionP.module.css";

export default function AttributionP() {
  return (
    <p className={styles["attribution-p"]}>
      Challenge by{" "}
      <a
        className={styles["attribution-link"]}
        href="https://www.frontendmentor.io/challenges/intro-section-with-dropdown-navigation-ryaPetHE5"
      >
        Frontend Mentor
      </a>
      . Coded by{" "}
      <a
        className={styles["attribution-link"]}
        href="https://github.com/LukaszManiak"
        role="button"
      >
        Łukasz Maniak
      </a>
      .
    </p>
  );
}
