export default function Navbar({ isDarkMode, onModeChange }) {
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
