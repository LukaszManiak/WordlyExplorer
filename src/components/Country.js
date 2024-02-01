import styles from "./Country.module.css";

export default function Country({ country, onCountrySelect, isDarkMode }) {
  return (
    <div
      onClick={() => onCountrySelect(country.name.common)}
      className={
        !isDarkMode
          ? `${styles["country-box"]} ${styles["bright-mode"]}`
          : `${styles["country-box"]} ${styles["dark-mode"]}`
      }
    >
      <img src={country.flags.svg} alt="country flag" />
      <div className={styles["country-box-detail"]}>
        <p className={styles["country-name"]}>{country.name.common}</p>
        <p>
          <b>Population</b>: {country.population}
        </p>
        <p>
          <b>Region</b>: {country.region}
        </p>
        <p>
          <b>Capital</b>: {country?.capital}
        </p>
      </div>
    </div>
  );
}
