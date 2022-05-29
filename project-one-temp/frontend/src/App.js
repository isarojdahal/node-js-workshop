import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddBook from "./pages/AddBook";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
import "./assets/sass/main.scss";
import ListBook from "./pages/ListBook";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard">
          <Route index element={<Dashboard />} />
          <Route path="addBook" element={<AddBook />} />
          <Route path="listBook" element={<ListBook />} />
        </Route>
        <Route path="*" element={<>Page Not Found</>} />
      </Routes>
    </Router>
  );
}

export default App;
