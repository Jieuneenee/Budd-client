import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";

import MainPage from "./pages/MainPage.jsx";
import Login from "./pages/Login.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>

      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
