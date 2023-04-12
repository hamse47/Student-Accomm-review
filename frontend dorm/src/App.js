import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./component/navbar";
import Home from "./pages/home";
import DormList from "./pages/dorm-list";
import DormDetail from "./pages/dorm-details";
import AddReview from "./pages/add-review";
import Login from "./pages/login";
import Register from "./pages/register";
import "./axiosConfig";
import AuthContext from "./context";

function App() {
  const [token, setToken] = useState(null);
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
  }, []);
  return (
    <AuthContext.Provider value={{ token, setToken }}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dorm/:school" element={<DormList />} />
          <Route path="/dorm/:school/:dormid" element={<DormDetail />} />
          <Route path="/add-review/:school/:dorm" element={<AddReview />} />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
