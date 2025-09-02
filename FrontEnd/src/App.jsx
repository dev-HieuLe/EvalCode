import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";
//Home
import Home from "./Components/Homepage/Hero";
import Information from "./Components/Homepage/information";
import Tutorial from "./Components/Homepage/Tutorial";
import Testimonial from "./Components/Homepage/Testimonials";
import Price from "./Components/Homepage/price";
import JoinUsNow from "./Components/Homepage/JoinUsNow";
//Navbar
import Navbar from "./Components/Navbar";
//Footer
import Footer from "./Components/Footer";
//Login
import Login from "./Components/Login/Login";
//SignUp
import Signup from "./Components/SignUp/SignUp";
import FAQ from "./Components/FAQ";
import Pricing from "./Components/Pricing";
import Reviews from "./Components/Reviews";
//Dashboard
import Dashboard from "./Components/User/MainDashboard";
//CHatBot
import ChatbotWidget from "./Components/ChatBot"; 

function App() {
  const location = useLocation();
  return (
    <>
      {!location.pathname.startsWith("/users/dashboard") && <Navbar />}
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Home />
              <Information />
              <Tutorial />
              <Testimonial />
              <Price />
              <JoinUsNow />
            </>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/users/dashboard/:id" element={<Dashboard />} />
        <Route path="/users/dashboard/:id/batch/:batchId" element={<Dashboard />} />
      </Routes>
      
      {!location.pathname.startsWith("/users/dashboard") && <Footer />}
      <ChatbotWidget />
    </>
  );
}

export default App;
