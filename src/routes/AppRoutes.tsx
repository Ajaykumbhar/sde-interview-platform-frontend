import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "../pages/home/HomePage";
import LoginPage from "../pages/auth/LoginPage";
import MainLayout from "../layouts/MainLayout";
import ProblemsPage from "../pages/problems/ProblemsPage";
import CreateProblemsPage from "../pages/problems/CreateProblemsPage";
import EditProblemsPage from "../pages/problems/EditProblemsPage";

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

        <Route
          path="/problems"
          element={
            <MainLayout>
              <ProblemsPage />
            </MainLayout>
          }
        />
        <Route
          path="/createProblem"
          element={
            <MainLayout>
              <CreateProblemsPage />
            </MainLayout>
          }
        />
        <Route
          path="/editProblem/:id"
          element={
            <MainLayout>
              <EditProblemsPage />
            </MainLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
