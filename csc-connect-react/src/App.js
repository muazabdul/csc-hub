import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import PosterList from './components/Posters/PosterList';
import PosterDetails from './components/Posters/PosterDetails';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div>
          <Header title="CSC Connect - Official Site" />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/posters" element={<PosterList />} />
            <Route path="/posters/:id" element={<PosterDetails />} />
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
      </AuthProvider>
    </Router>
  );
}

export default App;