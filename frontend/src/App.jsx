import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Chat from "./pages/Chat";

function App({ isDarkMode, setIsDarkMode }) {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Login isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
          }
        />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </Router>
  );
}

export default App;
