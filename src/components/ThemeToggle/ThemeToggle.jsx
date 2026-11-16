import './ThemeToggle.css'
import useShop from "../../context/useShop.js";


function ThemeToggle() {
  const { theme, toggleTheme } = useShop();
  const isDark = theme === "dark";

  return (
    <button
      className='toggle-button'
      type="button"
      onClick={toggleTheme}
      aria-label={
        isDark
          ? "Включить светлую тему"
          : "Включить тёмную тему"
      }
    >
      <span>{isDark ? "☼ Тема" : "☽ Тема"}</span>
    </button>
  );
}

export default ThemeToggle;