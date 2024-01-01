import { useEffect, useState, useRef } from "react";

// components
import Loader from "./Loader.js";
import ErrorMessage from "./ErrorMessage.js";
import Navbar from "./Navbar.js";
import AttributionP from "./AttributionP.js";
import Home from "./Home.js";
import Country from "./Country.js";
import Countries from "./Countries.js";
import SearchBar from "./SearchBar.js";
import NoCountriesHomeScreen from "./NoCountriesHomeScreen.js";
import DetailCountry from "./DetailCountry.js";

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
  useEffect(
    function () {
      bodyEl.current[0].classList.toggle("dark-mode", isDarkMode);
    },
    [isDarkMode]
  );

  return (
    <div className="app">
      <Navbar onModeChange={handleModeChange} isDarkMode={isDarkMode} />
      {/* searchbar */}
      {!selectedCountry && (
        <SearchBar
          searchCountry={searchCountry}
          onSearchChange={handleSearchChange}
          onRegionChange={handleRegionSelect}
          region={region}
          isDarkMode={isDarkMode}
        />
      )}

      {/* home/certain country detail section */}
      {!(selectedCountry !== null) ? (
        <Home>
          {/* loader box */}
          {isLoading && <Loader />}

          {/* noCountries screen */}
          {!isLoading && countries.length === 0 && (
            <NoCountriesHomeScreen
              isDarkMode={isDarkMode}
              onGoBackToHome={handleGoBackToHome}
            />
          )}
          {!isLoading && countries.length > 0 && (
            // countries screen
            <Countries>
              {countries.map((c, i) => (
                <Country
                  isDarkMode={isDarkMode}
                  onCountrySelect={handleCountrySelection}
                  key={i}
                  country={c}
                />
              ))}
            </Countries>
          )}
        </Home>
      ) : (
        // certain country details screen
        <DetailCountry
          onCountrySelect={handleCountrySelection}
          isDarkMode={isDarkMode}
          selectedCountry={selectedCountry}
          onGoBackToHome={handleGoBackToHome}
          data={countries}
        />
      )}

      {/* attribution */}
      <AttributionP />
      {error && <ErrorMessage err={error} />}
    </div>
  );
}

export default App;
