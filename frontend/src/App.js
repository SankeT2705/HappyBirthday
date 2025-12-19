import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import CreatePage from "./pages/CreatePage";
import BirthdayPage from "./pages/BirthdayPage";
import "./index.css";

/*
  App.jsx
  ----------
  Root routing file.
  Backend-driven, shareable URLs.
*/

function App() {
  return (
    <Router>
      <Routes>

        {/* Default */}
        <Route path="/" element={<Navigate to="/create" />} />

        {/* Create page */}
        <Route path="/create" element={<CreatePage />} />

        {/* Shareable Birthday Page */}
        <Route path="/birthday/:slug" element={<BirthdayPage />} />

        {/* 404 */}
        <Route
          path="*"
          element={
            <div style={{ textAlign: "center", padding: "50px" }}>
              <h2>404 – Page Not Found</h2>
              <p>The page you are looking for does not exist.</p>
            </div>
          }
        />

      </Routes>
    </Router>
  );
}

export default App;
