import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// Components
import Footer from "./components/Footer";

// Public
import HomeScreen from "./pages/public/HomeScreen";
import ShopScreen from "./pages/public/ShopScreen";
import LoginScreen from "./pages/public/LoginScreen";
import NotFound from "./pages/public/NotFound";
// Dashboard
import { AdminDashboard, AdviserDashboard } from "./layouts";
const App = () => {
  return (
    <main className="bg-[#F5F4F2]">
      <Router>
        <Routes>
          <Route path="/" element={<HomeScreen />} exact />
          <Route path="/shop" element={<ShopScreen />} exact />
          <Route path="/login" element={<LoginScreen />} exact />
          <Route path="/admin/*" element={<AdminDashboard />} />
          <Route path="/adviser/*" element={<AdviserDashboard />} />
          <Route path="*" element={<NotFound />} exact />
        </Routes>
        <Footer />
      </Router>
    </main>
  );
};

export default App;
