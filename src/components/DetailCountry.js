import NoCountriesHomeScreen from "./NoCountriesHomeScreen";

export default function DetailCountry({
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

  console.log(
    country,
    // country.currencies[Object.keys(country.currencies)[0]].name

    Object.entries(country.languages)
      .map(([code, name]) => ({ code, name }))
      .map((lan) => lan.name)
  );

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
          <h1 className="country-name">{country.name.common}</h1>
          <div className="details-lists">
            <ul>
              <li>
                <b>Native Name</b>:{" "}
                {country.name.official
                  ? country.name.official
                  : country.name.nativeName.eng.official}
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
                <b>Top Level Domain</b>: {country.tld}
              </li>
              <li>
                <b>Currencies</b>:{" "}
                {country.currencies[Object.keys(country.currencies)[0]].name}
              </li>
              <li>
                <b>Languages</b>:{" "}
                {Object.entries(country.languages)
                  .map(([code, name]) => ({ code, name }))
                  .map((lan) => `${lan.name}  | `)}
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
