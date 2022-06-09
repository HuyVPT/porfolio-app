import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import "./App.scss";
import Cube from "./components/cube/cube";
import FitNavBar from "./components/nav-bar/nav-bar";
import ThemeContext, { initialTheme } from "./theme/theme";

const cubesProvider = [
  { position: { x: 5, y: 80 }, size: 75, color: "#f44336" },
  { position: { x: 15, y: 30 }, size: 150, color: "#ffa117" },
  { position: { x: 65, y: 30 }, size: 250, color: "#0fc70f" },
  { position: { x: 92, y: 70 }, size: 100, color: "#2196f3" },
  { position: { x: 35, y: 60 }, size: 125, color: "#b145e9" },
];
function App() {
  const [theme, setTheme] = useState(initialTheme.dark);
  const toggleTheme = () => {
    setTheme(
      theme.name === initialTheme.dark.name
        ? initialTheme.light
        : initialTheme.dark
    );
  };
  const setProperty = (name: string, value: string) => {
    document.documentElement.style.setProperty(name, value);
  };
  useEffect(() => {
    setProperty("--txt-color", theme.color);
    setProperty("--bg-color-primary", theme.background.primary);
    setProperty("--bg-color-secondary", theme.background.secondary);
    setProperty("--contract-color", theme.background.contract);
    setProperty("--contract-color-secondary", theme.background.contractSecondary);
    setProperty("--cv-left-side", theme.cv.leftSide);
    setProperty("--cv-right-side", theme.cv.rightSide);
  }, [theme]);
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="App">
        <FitNavBar />
        <div className="page-content">
          <Outlet />
        </div>
        {cubesProvider.map((cube, index) => (
          <Cube
            key={`cube${index}`}
            position={cube.position}
            size={cube.size}
            color={cube.color}
          ></Cube>
        ))}
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
