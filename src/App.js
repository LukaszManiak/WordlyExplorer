import { useState } from "react";
import data from "./data.json";

function App() {
  const [whichScreen, setWhichScreen] = useState("home");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [searchCountry, setSearchCountry] = useState("");
  const [region, setRegion] = useState("None");

  let countriesData;
  function handleSearchChange(e) {
    e.preventDefault();
    const searchValue = e.target.value;
    setSearchCountry(searchValue);
  }

  function handleRegionSelect(e) {
    e.preventDefault();
    const selectedRegion = e.target.value;
    setRegion(selectedRegion);
  }
  countriesData = data.filter((c) =>
    c.name.toLowerCase().includes(searchCountry.toLowerCase())
  );

  if (region === "None") countriesData = countriesData;
  if (region === "Africa")
    countriesData = data.slice().filter((c) => c.region === "Africa");
  if (region === "America")
    countriesData = data.slice().filter((c) => c.region === "Americas");
  if (region === "Europe")
    countriesData = data.slice().filter((c) => c.region === "Europe");
  if (region === "Oceania")
    countriesData = data.slice().filter((c) => c.region === "Oceania");
  if (region === "Asia")
    countriesData = data.slice().filter((c) => c.region === "Asia");

  function handleGoBackToHome() {
    setSelectedCountry(null);
  }

  function handleScreenSwitch(screen) {
    setWhichScreen(screen);
  }

  function handleCountrySelection(val) {
    const selected = val;
    setSelectedCountry(selected);
  }

  return (
    <div className="app">
      <Navbar />

      {!(selectedCountry !== null) ? (
        <Home
          searchCountry={searchCountry}
          onSearchChange={handleSearchChange}
          onCountrySelect={handleCountrySelection}
          onRegionChange={handleRegionSelect}
          region={region}
          countriesData={countriesData}
        />
      ) : (
        <DetailCountry
          selectedCountry={selectedCountry}
          onGoBackToHome={handleGoBackToHome}
        />
      )}
    </div>
  );
}

function Navbar() {
  return (
    <nav>
      <h1>Where in the world?</h1>

      <div>
        <button>Dark Mode</button>
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
}) {
  return (
    <section className="home-section">
      <SearchBar
        searchCountry={searchCountry}
        onSearchChange={onSearchChange}
        onRegionChange={onRegionChange}
        region={region}
      />
      <Countries
        countriesData={countriesData}
        onCountrySelect={onCountrySelect}
      />
    </section>
  );
}

function SearchBar({ onSearchChange, searchCountry, onRegionChange, region }) {
  return (
    <div className="search-bar">
      <input
        value={searchCountry}
        onChange={(e) => onSearchChange(e)}
        placeholder="Search for a country..."
      />

      <select value={region} onChange={(e) => onRegionChange(e)}>
        <option value={"None"}>None</option>
        <option value={"Africa"}>Africa</option>
        <option value={"America"}>America</option>
        <option value={"Asia"}>Asia</option>
        <option value={"Europe"}>Europe</option>
        <option value={"Oceania"}>Oceania</option>
      </select>
    </div>
  );
}

function Countries({ onCountrySelect, countriesData }) {
  return (
    <div className="countries-container">
      {" "}
      {countriesData.map((c, i) => (
        <Country onCountrySelect={onCountrySelect} key={i} country={c} />
      ))}
    </div>
  );
}

function Country({ country, onCountrySelect }) {
  return (
    <div onClick={() => onCountrySelect(country.name)} className="country-box">
      <img src={country.flag} alt="country flag" />
      <div className="country-box-detail">
        <p>{country.name}</p>
        <p>Population: {country.population}</p>
        <p>Region: {country.region}</p>
        <p>Capital: {country?.capital}</p>
      </div>
    </div>
  );
}

function DetailCountry({ selectedCountry, onGoBackToHome }) {
  const country = data.filter((c) => c.name === selectedCountry)[0];

  return (
    <section className="detail-country-section">
      <button className="go-back-button" onClick={() => onGoBackToHome()}>
        Back
      </button>

      <div className="details-container">
        <img src={country.flag} alt="flag" />
        <div className="details">
          <p>{country.name}</p>
          <ul>
            <li>Native Name: {country.nativeName}</li>
            <li>Population: {country.population} </li>
            <li>Region: {country.region}</li>
            <li>Sub Region: {country.subregion}</li>
            <li>Capital: {country.capital}</li>
            <li>Top Level Domain: {country.topLevelDomain}</li>
            <li>Currencies: {country.currencies[0].name}</li>
            <li>Languages: {country.languages[0].name}</li>
          </ul>
          {country.borders ? (
            <div className="borders-container">
              <p>Border Countries: </p>
              <ul className="country-borders">
                {country.borders.map((b, i) => (
                  <li key={i}>{b}</li>
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

export default App;
