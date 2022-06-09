import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Profile from "./pages/profile/profile";
import Home from "./pages/home/home";
import Project from "./pages/project/project";
import Photo from "./pages/photo/photo";
import Setting from "./pages/setting/setting";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <BrowserRouter>
    <React.StrictMode></React.StrictMode>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="home" element={<Home />}></Route>
        <Route path="profile" element={<Profile />}></Route>
        <Route path="photo" element={<Photo />}></Route>
        <Route path="project" element={<Project />}></Route>
        <Route path="setting" element={<Setting />}></Route>
      </Route>
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
