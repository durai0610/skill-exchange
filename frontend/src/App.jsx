import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Matches from "./pages/Matches";
import Sessions from "./pages/Sessions";
import Messages from "./pages/Messages";
import Reviews from "./pages/Reviews";

export default function App() {
  const token = localStorage.getItem("token");

  return (
    <BrowserRouter>
      {/* Navbar shown only for authenticated users */}
      {token && <Navbar />}

      <Routes>
        {/* ---------- PUBLIC ROUTES ---------- */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ---------- PROTECTED ROUTES ---------- */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/matches"
          element={
            <ProtectedRoute>
              <Matches />
            </ProtectedRoute>
          }
        />

        <Route
          path="/sessions"
          element={
            <ProtectedRoute>
              <Sessions />
            </ProtectedRoute>
          }
        />

        <Route
          path="/messages"
          element={
            <ProtectedRoute>
              <Messages />
            </ProtectedRoute>
          }
        />

        <Route
          path="/reviews/:id"
          element={
            <ProtectedRoute>
              <Reviews />
            </ProtectedRoute>
          }
        />

        {/* ---------- FALLBACK ---------- */}
        <Route
          path="*"
          element={<Navigate to={token ? "/" : "/login"} />}
        />
      </Routes>
    </BrowserRouter>
  );
}
