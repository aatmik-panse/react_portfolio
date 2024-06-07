import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProjectPage from "./pages/ProjectPage/ProjectPage";
import HomePage from "./pages/HomePage/HomePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projectsPage" element={<ProjectPage />} />
      </Routes>
    </Router>
  );
}

export default App;
