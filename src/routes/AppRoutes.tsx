import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "../pages/home/HomePage";
import LoginPage from "../pages/auth/LoginPage";
import MainLayout from "../layouts/MainLayout";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout>
              <HomePage />
            </MainLayout>
          }
        />

        <Route
          path="/login"
          element={
            <MainLayout>
              <LoginPage />
            </MainLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
