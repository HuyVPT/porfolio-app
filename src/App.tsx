import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.scss';
import MainLayout from './components/layouts/MainLayout';
import Home from './pages/home/home';
import Photo from './pages/photo/photo';
import Profile from './pages/profile/profile';
import Project from './pages/project/project';
import Setting from './pages/setting/setting';
import ThemeContext, { initialTheme } from './theme/theme';

function App() {
  const [theme, setTheme] = useState(initialTheme.dark);
  const toggleTheme = () => {
    setTheme(theme.name === initialTheme.dark.name ? initialTheme.light : initialTheme.dark);
  };
  const setProperty = (name: string, value: string) => {
    document.documentElement.style.setProperty(name, value);
  };
  useEffect(() => {
    setProperty('--txt-color', theme.color);
    setProperty('--bg-color-primary', theme.background.primary);
    setProperty('--bg-color-secondary', theme.background.secondary);
    setProperty('--contract-color', theme.background.contract);
    setProperty('--contract-color-secondary', theme.background.contractSecondary);
    setProperty('--cv-left-side', theme.cv.leftSide);
    setProperty('--cv-right-side', theme.cv.rightSide);
  }, [theme]);
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<Home />}></Route>
          <Route path="profile" element={<Profile />}></Route>
          <Route path="photo" element={<Photo />}></Route>
          <Route path="project" element={<Project />}></Route>
          <Route path="setting" element={<Setting />}></Route>
          <Route path="*" element={<Home />}></Route>
        </Route>
      </Routes>
    </ThemeContext.Provider>
  );
}

export default App;
