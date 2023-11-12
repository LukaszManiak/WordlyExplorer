import data from "./data.json";
function App() {
  return (
    <div className="App">
      <Navbar />
      <SearchBar />
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

function SearchBar() {
  return (
    <div>
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
    <div>
      {data.map((c) => (
        <Country country={c} />
      ))}
    </div>
  );
}

function Country({ country }) {
  return <div></div>;
}

export default App;
