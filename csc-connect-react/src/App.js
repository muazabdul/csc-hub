import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext'; // Import AuthProvider

function App() {
  return (
    <AuthProvider> {/* Wrap Router with AuthProvider */}
      <Router>
        <div>
          <Header title="CSC huB - Under Dev" />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <MainContent />
                </ProtectedRoute>
              }
            />
          </Routes>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;