import "./App.css";
import { AuthProvider } from "./Components/AuthContext";
import SignUp from "./Components/SignUp";
import Login from "./Components/Login";
import Dashboard from "./Components/DashBoard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Auth from "./Components/Auth";
import ComingSoon from "./Components/ComingSoon";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          >
            <Route
              path="profile"
              element={<ComingSoon title="Profile Settings" />}
            />
            <Route path="faqs" element={<ComingSoon title="FAQs" />} />
            <Route
              path="driver-registration"
              element={<ComingSoon title="Driver Registration" />}
            />
            <Route path="refer" element={<ComingSoon title="Refer & Earn" />} />
            <Route
              path="earnings"
              element={<ComingSoon title="My Earnings" />}
            />
          </Route>
          <Route path="/register" element={<SignUp />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
