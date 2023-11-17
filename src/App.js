import { useState } from "react";
import data from "./data.json";

function App() {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [searchCountry, setSearchCountry] = useState("");
  const [region, setRegion] = useState("None");
  const [isDarkMode, setIsDarkMode] = useState(false);

  function handleModeChange() {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle("dark-mode");
  }

  let countriesData;
  function handleSearchChange(e) {
    e.preventDefault();
    const searchValue = e.target.value;
    setSearchCountry(searchValue);
  }

  function handleRegionSelect(value) {
    let selectedRegion;
    if (value === region) selectedRegion = "None";
    if (value !== region) selectedRegion = value;

    setRegion(selectedRegion);
  }

  if (region === "None" && searchCountry === "") countriesData = data;

  if (region === "None" && searchCountry !== "")
    countriesData = data.filter((c) =>
      c.name.toLowerCase().includes(searchCountry.toLowerCase())
    );
  if (region === "Africa" && searchCountry !== "")
    countriesData = data
      .slice()
      .filter((c) => c.name.toLowerCase().includes(searchCountry.toLowerCase()))
      .filter((c) => c.region === "Africa");
  if (region === "America" && searchCountry !== "")
    countriesData = data
      .slice()
      .filter((c) => c.region === "Americas")
      .filter((c) =>
        c.name.toLowerCase().includes(searchCountry.toLowerCase())
      );
  if (region === "Europe" && searchCountry !== "")
    countriesData = data
      .slice()
      .filter((c) => c.region === "Europe")
      .filter((c) =>
        c.name.toLowerCase().includes(searchCountry.toLowerCase())
      );
  if (region === "Oceania" && searchCountry !== "")
    countriesData = data
      .slice()
      .filter((c) => c.region === "Oceania")
      .filter((c) =>
        c.name.toLowerCase().includes(searchCountry.toLowerCase())
      );
  if (region === "Asia" && searchCountry !== "")
    countriesData = data
      .slice()
      .filter((c) => c.region === "Asia")
      .filter((c) =>
        c.name.toLowerCase().includes(searchCountry.toLowerCase())
      );
  if (region === "Africa" && searchCountry === "")
    countriesData = data.slice().filter((c) => c.region === "Africa");
  if (region === "America" && searchCountry === "")
    countriesData = data.slice().filter((c) => c.region === "Americas");
  if (region === "Europe" && searchCountry === "")
    countriesData = data.slice().filter((c) => c.region === "Europe");
  if (region === "Oceania" && searchCountry === "")
    countriesData = data.slice().filter((c) => c.region === "Oceania");
  if (region === "Asia" && searchCountry === "")
    countriesData = data.slice().filter((c) => c.region === "Asia");

  function handleGoBackToHome() {
    setSelectedCountry(null);
  }

  function handleCountrySelection(val) {
    const selected = val;
    setSelectedCountry(selected);
    console.log(selected);
  }

  return (
    <div className="app">
      <Navbar onModeChange={handleModeChange} isDarkMode={isDarkMode} />

      {!(selectedCountry !== null) ? (
        <Home
          isDarkMode={isDarkMode}
          searchCountry={searchCountry}
          onSearchChange={handleSearchChange}
          onCountrySelect={handleCountrySelection}
          onRegionChange={handleRegionSelect}
          region={region}
          countriesData={countriesData}
        />
      ) : (
        <DetailCountry
          onCountrySelect={handleCountrySelection}
          isDarkMode={isDarkMode}
          selectedCountry={selectedCountry}
          onGoBackToHome={handleGoBackToHome}
          data={data}
        />
      )}
      <AttributionP />
    </div>
  );
}

function Navbar({ isDarkMode, onModeChange }) {
  return (
    <nav className={!isDarkMode ? "nav bright-mode" : "nav dark-mode"}>
      <h1>Where in the world?</h1>

      <div>
        <button
          className={
            !isDarkMode
              ? "dark-mode-button bright-mode"
              : "dark-mode-button dark-mode"
          }
          onClick={() => onModeChange()}
        >
          {!isDarkMode ? "🌕" : "🌚"} Dark Mode
        </button>
      </div>
    </nav>
  );
}

function Home({
  onCountrySelect,
  onSearchChange,
  searchCountry,
  onRegionChange,
  region,
  countriesData,
  isDarkMode,
  onGoBackToHome,
}) {
  return (
    <section className="home-section">
      <SearchBar
        searchCountry={searchCountry}
        onSearchChange={onSearchChange}
        onRegionChange={onRegionChange}
        region={region}
        isDarkMode={isDarkMode}
      />
      {countriesData.length ? (
        <>
          <Countries
            isDarkMode={isDarkMode}
            countriesData={countriesData}
            onCountrySelect={onCountrySelect}
          />
        </>
      ) : (
        <NoCountriesHomeScreen
          isDarkMode={isDarkMode}
          onGoBackToHome={onGoBackToHome}
        />
      )}
    </section>
  );
}

function SearchBar({
  onSearchChange,
  searchCountry,
  onRegionChange,
  region,
  isDarkMode,
  isSelected,
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
        <li role="button" onClick={() => onRegionChange("Africa")}>
          Africa
        </li>
        <li role="button" onClick={() => onRegionChange("America")}>
          America
        </li>
        <li role="button" onClick={() => onRegionChange("Asia")}>
          Asia
        </li>
        <li role="button" onClick={() => onRegionChange("Europe")}>
          Europe
        </li>
        <li role="button" onClick={() => onRegionChange("Oceania")}>
          Oceania
        </li>
      </ul>
    </div>
  );
}

function Countries({ onCountrySelect, countriesData, isDarkMode }) {
  return (
    <div className="countries-container">
      {" "}
      {countriesData.map((c, i) => (
        <Country
          isDarkMode={isDarkMode}
          onCountrySelect={onCountrySelect}
          key={i}
          country={c}
        />
      ))}
    </div>
  );
}

function Country({ country, onCountrySelect, isDarkMode }) {
  return (
    <div
      onClick={() => onCountrySelect(country.name)}
      className={
        !isDarkMode ? "country-box bright-mode" : "country-box dark-mode"
      }
    >
      <img src={country.flag} alt="country flag" />
      <div className="country-box-detail">
        <p className="country-name">{country.name}</p>
        <p>Population: {country.population}</p>
        <p>Region: {country.region}</p>
        <p>Capital: {country?.capital}</p>
      </div>
    </div>
  );
}

function DetailCountry({
  selectedCountry,
  onGoBackToHome,
  isDarkMode,
  onCountrySelect,
  data,
}) {
  let country;
  if (selectedCountry.length === 3)
    country = data.filter((c) => c.cioc === selectedCountry)[0];
  if (selectedCountry.length > 3)
    country = data.filter((c) => c.name === selectedCountry)[0];

  if (!country) {
    return (
      <NoCountriesHomeScreen
        isDarkMode={isDarkMode}
        onGoBackToHome={onGoBackToHome}
      />
    );
  }

  return (
    <section className="detail-country-section">
      <button
        className={
          !isDarkMode
            ? "go-back-button bright-mode"
            : "go-back-button dark-mode"
        }
        onClick={() => onGoBackToHome()}
      >
        {!isDarkMode ? "👈🏻" : "👈"} Back
      </button>

      <div className="details-container">
        <img src={country.flag} alt="flag" />
        <div className="details">
          <p className="country-name">{country.name}</p>
          <div className="details-lists">
            <ul>
              <li>Native Name: {country.nativeName}</li>
              <li>Population: {country.population} </li>
              <li>Region: {country.region}</li>
              <li>Sub Region: {country.subregion}</li>
              <li>Capital: {country.capital}</li>
            </ul>
            <ul>
              <li>Top Level Domain: {country.topLevelDomain}</li>
              <li>Currencies: {country.currencies[0].name}</li>
              <li>Languages: {country.languages[0].name}</li>
            </ul>
          </div>
          {country.borders ? (
            <div className="borders-container">
              <p>Border Countries: </p>
              <ul className={"country-borders"}>
                {country.borders.map((b, i) => (
                  <li
                    className={
                      !isDarkMode ? "border bright-mode" : "border dark-mode"
                    }
                    onClick={() => onCountrySelect(b)}
                    key={i}
                  >
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </section>
  );
}

function NoCountriesHomeScreen({ isDarkMode, onGoBackToHome }) {
  return (
    <div className="no-countries-container">
      <button
        className={
          !isDarkMode
            ? "go-back-button no-countries bright-mode"
            : "go-back-button no-countries dark-mode"
        }
        onClick={() => onGoBackToHome()}
      >
        {!isDarkMode ? "👈🏻" : "👈"} Back
      </button>
      <h1>No countries found. Please try using different specifications.</h1>
    </div>
  );
}

function AttributionP() {
  return (
    <p className="attribution-p">
      Challenge by{" "}
      <a
        className="attribution-link"
        href="https://www.frontendmentor.io/challenges/intro-section-with-dropdown-navigation-ryaPetHE5"
      >
        Frontend Mentor
      </a>
      . Coded by{" "}
      <a
        className="attribution-link"
        href="https://github.com/LukaszManiak"
        role="button"
      >
        Łukasz Maniak
      </a>
      .
    </p>
  );
}

export default App;
