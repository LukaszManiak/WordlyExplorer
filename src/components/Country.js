export default function Country({ country, onCountrySelect, isDarkMode }) {
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
