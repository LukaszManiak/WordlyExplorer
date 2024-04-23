import { useState } from "react";
import styles from "./SearchBar.module.css";
export default function SearchBar({
  onSearchChange,
  searchCountry,
  onRegionChange,
  region,
  isDarkMode,
}) {
  const [isOpen, setIsOpen] = useState(false);

  function handleDropdownOpen() {
    setIsOpen(!isOpen);
  }

  return (
    <div className={styles["search-bar"]}>
      <input
        className={!isDarkMode ? styles["bright-mode"] : styles["dark-mode"]}
        value={searchCountry}
        onChange={(e) => onSearchChange(e)}
        placeholder="Search for a country..."
      />

      <div
        className={
          !isDarkMode
            ? `${styles["drop-down-header"]} ${styles["bright-mode"]}`
            : `${styles["drop-down-header"]} ${styles["dark-mode"]}`
        }
        onClick={() => handleDropdownOpen()}
      >
        Filter by region...
      </div>

      <ul
        className={
          isOpen
            ? isDarkMode
              ? `${styles["drop-down-menu"]} ${styles["bright-mode"]}`
              : `${styles["drop-down-menu"]} ${styles["dark-mode"]}`
            : "hidden"
        }
      >
        <li
          className={region === "Africa" ? styles["selected"] : ""}
          role="button"
          onClick={() => onRegionChange("Africa")}
        >
          Africa
        </li>
        <li
          className={region === "Americas" ? styles["selected"] : ""}
          role="button"
          onClick={() => onRegionChange("Americas")}
        >
          America
        </li>
        <li
          className={region === "Asia" ? styles["selected"] : ""}
          role="button"
          onClick={() => onRegionChange("Asia")}
        >
          Asia
        </li>
        <li
          className={region === "Europe" ? styles["selected"] : ""}
          role="button"
          onClick={() => onRegionChange("Europe")}
        >
          Europe
        </li>
        <li
          className={region === "Oceania" ? styles["selected"] : ""}
          role="button"
          onClick={() => onRegionChange("Oceania")}
        >
          Oceania
        </li>
      </ul>
    </div>
  );
}
