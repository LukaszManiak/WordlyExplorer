import data from "./data.json";

function App() {
  return (
    <div className="app">
      <Navbar />
      {/* <Home /> */}
      <DetailCountry />
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

function Home() {
  return (
    <section className="home-section">
      <SearchBar />
      <Countries />
    </section>
  );
}

function SearchBar() {
  return (
    <div className="search-bar">
      <input placeholder="Search for a country..." />

      <select>
        <option>Africa</option>
        <option>America</option>
        <option>Asia</option>
        <option>Europe</option>
        <option>Oceania</option>
      </select>
    </div>
  );
}

function Countries() {
  return (
    <div className="countries-container">
      {" "}
      {data.map((c, i) => i < 8 && <Country key={i} country={c} />)}
    </div>
  );
}

function Country({ country }) {
  return (
    <div className="country-box">
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

function DetailCountry() {
  const country = data.filter((c) => c.name === "Poland")[0];

  return (
    <section className="detail-country-section">
      <button>Back</button>
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
            <li>Currencies: {country.currencies.name}</li>
            <li>Languages: {country.languages.name}</li>
          </ul>
          <div className="borders-container">
            <p>Border Countries: </p>
            <ul className="country-borders">
              {country.borders.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
