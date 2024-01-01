import { useState } from "react";

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
    <div className="search-bar">
      <input
        className={!isDarkMode ? "bright-mode" : "dark-mode"}
        value={searchCountry}
        onChange={(e) => onSearchChange(e)}
        placeholder="Search for a country..."
      />

      <div
        className={
          !isDarkMode
            ? "drop-down-header bright-mode"
            : "drop-down-header dark-mode"
        }
        onClick={() => handleDropdownOpen()}
      >
        Filter by region...
      </div>

      <ul
        className={
          isOpen
            ? isDarkMode
              ? "drop-down-menu bright-mode"
              : "drop-down-menu dark-mode"
            : "hidden"
        }
      >
        <li
          className={region === "Africa" ? "selected" : ""}
          role="button"
          onClick={() => onRegionChange("Africa")}
        >
          Africa
        </li>
        <li
          className={region === "America" ? "selected" : ""}
          role="button"
          onClick={() => onRegionChange("Americas")}
        >
          America
        </li>
        <li
          className={region === "Asia" ? "selected" : ""}
          role="button"
          onClick={() => onRegionChange("Asia")}
        >
          Asia
        </li>
        <li
          className={region === "Europe" ? "selected" : ""}
          role="button"
          onClick={() => onRegionChange("Europe")}
        >
          Europe
        </li>
        <li
          className={region === "Oceania" ? "selected" : ""}
          role="button"
          onClick={() => onRegionChange("Oceania")}
        >
          Oceania
        </li>
      </ul>
    </div>
  );
}
