import { createContext } from "react";

export const initialTheme = {
  light: {
    name: "light",
    color: "#000",
    background: {
      primary: "#ebf3ff",
      secondary: "#ffffff33",
      contract: "#222327",
      contractSecondary: "#1d1e22b3",
    },
    cv: {
      leftSide: "#3c3c3a",
      rightSide: "#51514f",
    },
  },
  dark: {
    name: "dark",
    color: "#fff",
    background: {
      primary: "#222327",
      secondary: "#1d1e22b3",
      contract: "#ebf3ff",
      contractSecondary: "#ffffff33",
    },
    cv: {
      leftSide: "#cecece",
      rightSide: "#dbdbdb",
    },
  },
};

const ThemeContext = createContext({
  theme: initialTheme.dark,
  toggleTheme: () => {},
});

export default ThemeContext;
