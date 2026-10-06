import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "../pages/home/HomePage";
import LoginPage from "../pages/auth/LoginPage";
import MainLayout from "../layouts/MainLayout";
import ProblemsPage from "../pages/problems/ProblemsPage";
import CreateProblemsPage from "../pages/problems/CreateProblemsPage";
import EditProblemsPage from "../pages/problems/EditProblemsPage";
import ProblemDetailsPage from "../pages/problems/ProblemDetailsPage";
import ProtectedRoute from "./ProtectedRoute";
import RegisterPage from "../pages/auth/RegisterPage";

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
          path="/signup"
          element={
            <MainLayout>
              <RegisterPage />
            </MainLayout>
          }
        />

        <Route
          path="/problems"
          element={
            <ProtectedRoute>
              <MainLayout>
                <ProblemsPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/createProblem"
          element={
            <ProtectedRoute>
              <MainLayout>
                <CreateProblemsPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/editProblem/:id"
          element={
            <ProtectedRoute>
              <MainLayout>
                <EditProblemsPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/problemDetails/:id"
          element={
            <ProtectedRoute>
              <MainLayout>
                <ProblemDetailsPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
