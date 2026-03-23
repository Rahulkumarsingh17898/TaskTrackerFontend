// import ProjectSidebar from "./components/ProjectSidebar";
// import NewProject from "./components/NewProject";
// import NoProjectSelected from "./components/NoProjectSelected";
// import { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
// import Navbar from "./components/Layout/Navbar";
// import LandingPage from "./components/LandingPage";
import Login from "./components/Auth/Login.jsx";
import Signup from "./components/Auth/Signup.jsx";
import ForgotPassword from "./components/Auth/ForgotPassword.jsx";
import Navbar from "./components/Layout/Navbar.jsx";
import AboutPage from "./components/Layout/AboutPage.jsx";
import Footer from "./components/Layout/Footer/Footer.jsx";
import ContactPage from "./components/Layout/contactPage/ContactPage.jsx";
import Dashboard from "./components/Dashboard.jsx";
import LandingPage from "./components/LandingPage.jsx";
import OAuth2RedirectHandler from "./components/Auth/OAuth2RedirectHandler.jsx";
import AccessDenied from "./components/Auth/AccessDenied.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import TaskView from "./components/TaskView.jsx";
import NewProject from "./components/NewProject.jsx";
import { useMyContext } from "./store/ContextApi.jsx";
import AdminUsers from "./components/AdminUsers.jsx";


function App() {
  const { isAdmin } = useMyContext();

  return (
    
    <Router>
      <Navbar />
        <Toaster position="bottom-center" reverseOrder={false} />

      <Routes>

          <Route path="/" element={<LandingPage />} />
          {/* --- PROTECTED ROUTES --- */}

          <Route 
    path="/admin/users" 
    element={
        <ProtectedRoute>
            {isAdmin ? <AdminUsers /> : <Navigate to="/access-denied" />}
        </ProtectedRoute>
    } 
/>
          
    <Route 
        path="/dashboard" 
        element={
            <ProtectedRoute>
                <Dashboard />
            </ProtectedRoute>
        } 
    />

    <Route 
        path="/new-project" 
        element={
            <ProtectedRoute>
                <NewProject />
            </ProtectedRoute>
        } 
    />

    <Route 
        path="/task-view" 
        element={
            <ProtectedRoute>
                <TaskView />
            </ProtectedRoute>
        } 
    />
        
      
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/access-denied" element={<AccessDenied />} />


          <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />
          {/* <Route path="/reset-password" element={<ResetPassword />} /> */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
