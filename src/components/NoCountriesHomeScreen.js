export default function NoCountriesHomeScreen({ isDarkMode, onGoBackToHome }) {
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
