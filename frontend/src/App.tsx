import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <>
                <Navbar />
                <Dashboard />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
