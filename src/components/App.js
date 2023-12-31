import { useEffect, useState, useRef } from "react";

// components
import Loader from "./Loader.js";
import ErrorMessage from "./ErrorMessage.js";
import Navbar from "./Navbar.js";
import AttributionP from "./AttributionP.js";

function App() {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [searchCountry, setSearchCountry] = useState("");
  const [region, setRegion] = useState("None");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const bodyEl = useRef(document.getElementsByTagName("body"));

  //IN PROGRESS

  const [countries, setCountries] = useState([]);
  // error and loading states
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // color change handler
  function handleModeChange() {
    setIsDarkMode(!isDarkMode);
  }

  // search input
  function handleSearchChange(e) {
    const searchValue = e.target.value;
    setSearchCountry(searchValue);
  }

  // region selection
  function handleRegionSelect(value) {
    let selectedRegion;
    if (value === region) selectedRegion = "None";
    if (value !== region) selectedRegion = value;

    setRegion(selectedRegion);
  }

  // back to home
  function handleGoBackToHome() {
    setSearchCountry("");
    setRegion("None");
    setSelectedCountry(null);
  }

  // selecting certain country
  function handleCountrySelection(val) {
    const selected = val;
    setSelectedCountry(selected);
  }

  // getting data from API
  useEffect(
    function () {
      async function fetchCountries() {
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch("https://restcountries.com/v3.1/all");

          if (!res.ok)
            throw new Error("Something went wrong with fetching data");

          const data = await res.json();
          if (data.Response === "False") throw new Error("data not found");

          // filtering for needed data
          let finalData = data;

          if (searchCountry.length > 0) {
            const searchQuery = searchCountry.toLowerCase();
            finalData = finalData.filter((c) =>
              c.name.common.toLowerCase().includes(searchQuery)
            );
          }

          if (region !== "None") {
            finalData = finalData.filter((c) => c.region === region);
          }

          setCountries(finalData);
          console.log(finalData);
          setError("");
        } catch (err) {
          console.error(err.message);
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }

      // if (searchCountry.length === 0) {
      //   setCountries([]);
      //   setError("");
      //   return;
      // }
      fetchCountries();
    },
    [searchCountry, region]
  );
  // changing color pallete
  useEffect(function () {
    bodyEl.current[0].classList.toggle("dark-mode");
  }, []);

  useEffect(
    function () {
      bodyEl.current[0].classList.toggle("dark-mode");
    },
    [isDarkMode]
  );

  return (
    <div className="app">
      <Navbar onModeChange={handleModeChange} isDarkMode={isDarkMode} />
      {!selectedCountry && (
        <SearchBar
          searchCountry={searchCountry}
          onSearchChange={handleSearchChange}
          onRegionChange={handleRegionSelect}
          region={region}
          isDarkMode={isDarkMode}
        />
      )}

      {!(selectedCountry !== null) ? (
        <Home
          isLoading={isLoading}
          isDarkMode={isDarkMode}
          searchCountry={searchCountry}
          onSearchChange={handleSearchChange}
          onCountrySelect={handleCountrySelection}
          onRegionChange={handleRegionSelect}
          region={region}
          countries={countries}
          onGoBackToHome={handleGoBackToHome}
        />
      ) : (
        <DetailCountry
          onCountrySelect={handleCountrySelection}
          isDarkMode={isDarkMode}
          selectedCountry={selectedCountry}
          onGoBackToHome={handleGoBackToHome}
          data={countries}
        />
      )}

      <AttributionP />
      {error && <ErrorMessage err={error} />}
    </div>
  );
}

function Home({
  onCountrySelect,
  isLoading,
  countries,
  isDarkMode,
  onGoBackToHome,
}) {
  return (
    <section className="home-section">
      {isLoading && <Loader />}

      {!isLoading && countries.length === 0 && (
        <NoCountriesHomeScreen
          isDarkMode={isDarkMode}
          onGoBackToHome={onGoBackToHome}
        />
      )}
      {!isLoading && countries.length > 0 && (
        <Countries
          isDarkMode={isDarkMode}
          countries={countries}
          onCountrySelect={onCountrySelect}
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

function Countries({ onCountrySelect, countries, isDarkMode }) {
  return (
    <div className="countries-container">
      {" "}
      {countries.map((c, i) => (
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
      onClick={() => onCountrySelect(country.name.common)}
      className={
        !isDarkMode ? "country-box bright-mode" : "country-box dark-mode"
      }
    >
      <img src={country.flags.svg} alt="country flag" />
      <div className="country-box-detail">
        <p className="country-name">{country.name.common}</p>
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

function DetailCountry({
  selectedCountry,
  onGoBackToHome,
  isDarkMode,
  onCountrySelect,
  data,
}) {
  let country;

  if (typeof selectedCountry === "string" && selectedCountry.length === 3)
    country = data.filter((c) => c.cioc === selectedCountry)[0];
  if (typeof selectedCountry === "string" && selectedCountry.length > 3)
    country = data.filter((c) => c.name.common === selectedCountry)[0];
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
        <img src={country.flags.svg} alt="flag" />
        <div className="details">
          <p className="country-name">{country.name.common}</p>
          <div className="details-lists">
            <ul>
              <li>
                <b>Native Name</b>: {country.nativeName}
              </li>
              <li>
                <b>Population</b>: {country.population}{" "}
              </li>
              <li>
                <b>Region</b>: {country.region}
              </li>
              <li>
                <b>Sub Region</b>: {country.subregion}
              </li>
              <li>
                <b>Capital</b>: {country.capital}
              </li>
            </ul>
            <ul>
              <li>
                <b>Top Level Domain</b>: {country.topLevelDomain}
              </li>
              <li>
                <b>Currencies</b>: {country.currencies.name}
              </li>
              <li>
                <b>Languages</b>: {country.languages.name}
              </li>
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

export default App;
