import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Login from "./pages/Login.jsx";
import UserListPage from "./pages/UserListPage.jsx";
import UserDetailPage from "./pages/UserDetailPage.jsx";
import Setting from "./pages/Setting.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/userlist" element={<UserListPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/user/:userId" element={<UserDetailPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
