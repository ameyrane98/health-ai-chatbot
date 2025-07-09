import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Chat from "./pages/Chat";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App({ isDarkMode, setIsDarkMode }) {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Login isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
          }
        />
        <Route path="/register" element={<Register />} />
        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <Chat />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}
