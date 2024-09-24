import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";

import MainPage from "./pages/MainPage.jsx";
import Login from "./pages/Login.jsx";
<<<<<<< HEAD
import UserListPage from "./pages/UserListPage.jsx";
=======
import UserDetailPage from "./pages/UserDetailPage.jsx";
>>>>>>> 3ccdfcb5cf3aa756f16b49c192b631756515e23b

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
<<<<<<< HEAD
        <Route path="/" element={<Login />} />
        <Route path="/userlist" element={<UserListPage />} />
=======
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<MainPage />} />
        <Route path='/user/:userId' element={<UserDetailPage />} />
>>>>>>> 3ccdfcb5cf3aa756f16b49c192b631756515e23b
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
