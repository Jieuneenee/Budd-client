import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";

import MainPage from "./pages/MainPage.jsx";
import Login from "./pages/Login.jsx";
import UserListPage from "./pages/UserListPage.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/userlist" element={<UserListPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
