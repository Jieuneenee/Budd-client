import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Login from "./pages/Login.jsx";
import UserListPage from "./pages/UserListPage.jsx";
import UserDetailPage from "./pages/UserDetailPage.jsx";
import Setting from "./pages/Setting.jsx";
import AccessErrorPage from "./pages/AccessErrorPage.jsx";

const role = sessionStorage.getItem("role");

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {role === "admin" && (
          <>
            <Route path='/userlist' element={<UserListPage />} />
            <Route path='/setting' element={<Setting />} />
            <Route path='/user/:userId' element={<UserDetailPage />} />
          </>
        )}
        <Route path='/userlist' element={<AccessErrorPage />} />
        <Route path='/setting' element={<AccessErrorPage />} />
        <Route path='/user/:userId' element={<AccessErrorPage />} />
        <Route path='/' element={<Login />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
